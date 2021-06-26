from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.response import Response
from common.abstract_api_views import AbstractModelViewSet
from .models import IsMember
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from users.models import CustomUser
from .models import Room, Message
from .serializers import (
    RoomSerializer,
    RoomDetailSerializer,
    MessageSerializer,
)
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from common.decorators import model_view_set_swagger_decorator


@model_view_set_swagger_decorator(["Messaging"])
class RoomViewSet(AbstractModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    detail_serializer_class = RoomDetailSerializer
    permission_classes = [
        IsAuthenticated,
        IsMember,
    ]

    def get_queryset(self):
        # Retrieve the available rooms for the user
        return self.request.user.rooms.all()


class AddRemoveMembers(APIView):
    permission_classes = [
        IsAuthenticated,
        IsMember,
    ]

    @swagger_auto_schema(tags=["Messaging"])
    def post(self, request, *args, **kwargs):  # todo: add more comments
        member_id = request.data
        room_id = kwargs["id"]
        try:
            room = Room.objects.get(id=room_id)
            if room.members.filter(id=request.user.id).exists():
                user = CustomUser.objects.get(id=member_id)
                room.members.add(
                    user
                )  # todo: use membership_set instead of members. Figure out what needs to be passed as an argument(s)
                if room.members.filter(id=member_id):
                    return Response({"message": "Member already exists"})

                return Response({"message": "Member added to room"})

            return Response(
                {"detail": "Not found."}, status=status.HTTP_400_BAD_REQUEST
            )

        except ObjectDoesNotExist as e:
            if e.args == ("CustomUser matching query does not exist.",):
                return Response(
                    {"detail": "User not found."}, status=status.HTTP_400_BAD_REQUEST
                )
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    @swagger_auto_schema(tags=["Messaging"])
    def delete(self, request, *args, **kwargs):  # todo: add more comments
        room_id = kwargs["id"]
        member = request.user
        try:
            room = Room.objects.get(id=room_id)
            room.members.remove(
                member
            )  # todo: use membership_set instead of members. Figure out what needs to be passed as an argument(s)
            return Response({"message": "Member Removed."})
        except ObjectDoesNotExist as e:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Messaging"]))
class MessageList(ListAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [
        IsAuthenticated,
    ]

    def list(self, request, *args, **kwargs):
        try:
            # Verify that the user is a member of the room
            if (
                Room.objects.get(id=kwargs["id"])
                .members.filter(id=request.user.id)
                .exists()
            ):
                # Retrieve the messages for the room
                self.queryset = Message.objects.filter(room=kwargs["id"])
                return ListAPIView.list(self, request, *args, **kwargs)

            return Response("Permission denied", status=status.HTTP_403_FORBIDDEN)

        # Room was not found
        except ObjectDoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
