from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Room, Message, IsCreatorOrMemberReadOnly
from .serializers import RoomSerializer, MessageSerializer
from users.models import CustomUser
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


# HTTP GET: Returns a list of rooms that the user can see
# HTTP POST: Creates a room
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Messaging']))
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Messaging']))
class RoomListCreate(GenericPostListCreate):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [
        IsCreatorOrMemberReadOnly,
    ] + GenericPostListCreate.permission_classes

    def list(self, request, *args, **kwargs):
        self.queryset = CustomUser.objects.get(id=request.user.id).room_set.all() | Room.objects.filter(privacy_level=0)
        return GenericPostListCreate.list(self, request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        response = GenericPostListCreate.create(self, request, *args, **kwargs)

        if response.status_code == status.HTTP_201_CREATED:
            if request.user.id not in response.data['members']:
                Room.objects.get(id=response.data['id']).members.add(request.user.id)
                response.data['members'] = Room.objects.get(id=response.data['id']).members.values_list('id', flat=True)

        return response


# HTTP GET: Returns a room
# HTTP PUT: Updates a room
# HTTP PATCH: Partially updates a room
# HTTP DELETE: Deletes a room
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Messaging']))
@method_decorator(name='put', decorator=swagger_auto_schema(tags=['Messaging']))
@method_decorator(name='patch', decorator=swagger_auto_schema(tags=['Messaging']))
@method_decorator(name='delete', decorator=swagger_auto_schema(tags=['Messaging']))
class RoomRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [
        IsCreatorOrMemberReadOnly,
    ] + GenericPostRetrieveUpdateDestroy.permission_classes

    def update(self, request, *args, **kwargs):
        response = GenericPostRetrieveUpdateDestroy.update(self, request, *args, **kwargs)

        if response.status_code == status.HTTP_200_OK:
            if request.user.id not in response.data['members']:
                Room.objects.get(id=response.data['id']).members.add(request.user.id)
                response.data['members'] = Room.objects.get(id=response.data['id']).members.values_list('id', flat=True)

        return response


# HTTP GET: Returns a list of messages for a room
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Messaging']))
class MessageList(ListAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [
        IsAuthenticated,
    ]

    def list(self, request, *args, **kwargs):
        try:
            if Room.objects.get(id=kwargs['id']).members.filter(id=request.user.id):
                self.queryset = Message.objects.filter(room=kwargs['id'])
                return ListAPIView.list(self, request, *args, **kwargs)

            return Response('Permission denied', status=status.HTTP_403_FORBIDDEN)

        except ObjectDoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)


# HTTP GET: Returns the members of a room
# HTTP POST: Add or remove members from a room
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Messaging']))
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Messaging']))
class RoomMembers(APIView):
    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request, *args, **kwargs):
        try:
            room = Room.objects.get(id=kwargs['id'])
        except ObjectDoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

        return Response(room.members.values('id'))

    def post(self, request, *args, **kwargs):
        try:
            room = Room.objects.get(id=kwargs['id'])
        except ObjectDoesNotExist:
            return Response('Room not found', status=status.HTTP_404_NOT_FOUND)

        if request.user.id != room.creator_id:
            return Response('You cannot add or remove members from this room', status=status.HTTP_400_BAD_REQUEST)

        try:
            members = request.data['members']
        except KeyError:
            return Response('You did not specify the members to add', status=status.HTTP_400_BAD_REQUEST)

        if not isinstance(members, list):
            return Response("The members field must be a list of dictionaries with the integer field 'id' and boolean "
                            "field 'add'", status=status.HTTP_400_BAD_REQUEST)

        if not all(isinstance(member['id'], int) and isinstance(member['add'], bool) for member in members):
            return Response("The members field must be a list of dictionaries with the integer field 'id' and boolean "
                            "field 'add'", status=status.HTTP_400_BAD_REQUEST)

        for member in members:
            if len(CustomUser.objects.filter(id=member['id'])) == 0:
                return Response(f"Member with the ID {member['id']} does not exist")
            elif member['id'] == request.user.id:
                return Response('You cannot add/remove yourself from this room', status=status.HTTP_400_BAD_REQUEST)

        for member in members:
            if member['add']:
                room.members.add(member['id'])
            elif not member['add']:
                room.members.remove(member['id'])

        return Response(room.members.values('id'))
