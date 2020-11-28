from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from common.abstract_api_views import AbstractModelViewSet
from common.abstract_models import IsMember
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Room, Message, IsCreatorOrMemberReadOnly
from .serializers import RoomSerializer, MessageSerializer
from users.models import CustomUser
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


@method_decorator(name="list", decorator=swagger_auto_schema(tags=["Room"]))
@method_decorator(name="create", decorator=swagger_auto_schema(tags=["Room"]))
@method_decorator(name="retrieve", decorator=swagger_auto_schema(tags=["Room"]))
@method_decorator(name="update", decorator=swagger_auto_schema(tags=["Room"]))
@method_decorator(name="partial_update", decorator=swagger_auto_schema(tags=["Room"]))
@method_decorator(name="destroy", decorator=swagger_auto_schema(tags=["Room"]))
class RoomViewSet(AbstractModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    detail_serializer_class = RoomSerializer
    # filterset_class = RoomSerializer
    # search_fields = [
    #     "title",
    # ]
    permission_classes = [
        IsAuthenticated,
        IsMember,
    ]

    def get_queryset(self):
        return self.request.user.room_set.all()


# HTTP GET: Returns a list of messages for a room
@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Messaging"]))
class MessageList(ListAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [
        IsAuthenticated,
    ]

    def list(self, request, *args, **kwargs):
        try:
            if (
                Room.objects.get(id=kwargs["id"])
                .members.filter(id=request.user.id)
                .exists()
            ):
                self.queryset = Message.objects.filter(room=kwargs["id"])
                return ListAPIView.list(self, request, *args, **kwargs)

            return Response("Permission denied", status=status.HTTP_403_FORBIDDEN)

        except ObjectDoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
