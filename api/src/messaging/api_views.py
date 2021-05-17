from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.response import Response
from common.abstract_api_views import AbstractModelViewSet
from .models import IsMember
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Room, Message
from .serializers import RoomSerializer, RoomDetailSerializer, MessageSerializer
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from common.decorators_api_views import viewsets_swagger_decorator


@viewsets_swagger_decorator(["Messaging"])
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
