from typing import List
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Device
from .serializers import (
    NotificationSerializer,
    DeviceSerializer,
    ReceivedNotificationsSerializer,
)
from common.abstract_models import IsCreator
from rest_framework.permissions import IsAuthenticated
from common.decorators import (
    model_view_set_swagger_decorator,
    api_view_swagger_decorator,
)


@api_view_swagger_decorator(["Notifications"])
class ViewedReceivedNotifications(ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [
        IsAuthenticated,
    ]

    def get_serializer_class(self):
        # Use the detailed serializer class on HTTP GET and regular serializer class on all other HTTP methods
        if self.request.method == "GET":
            return self.serializer_class

        return ReceivedNotificationsSerializer

    def get_queryset(self):
        # Retrieve the received and viewed notifications for the user
        return (
            self.request.user.received_notifications.all()
            | self.request.user.viewed_notifications.all()
        )

    def post(self, request, *args, **kwargs):
        serializer = ReceivedNotificationsSerializer(data=request.data)

        # Validate HTTP POST data
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        notification_ids: List[int] = serializer.data["received_notifications"]

        for notification_id in notification_ids:
            if request.user.received_notifications.filter(id=notification_id).exists():
                # Move notification from received to viewed
                request.user.received_notifications.remove(notification_id)
                request.user.viewed_notifications.add(notification_id)

        return Response(status=status.HTTP_204_NO_CONTENT)


@model_view_set_swagger_decorator(["Notifications"])
class DeviceViewSet(ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
    permission_classes = [IsAuthenticated, IsCreator]
    pagination_class = None

    def get_queryset(self):
        # Retrieve the devices for the user
        return self.request.user.devices.all()
