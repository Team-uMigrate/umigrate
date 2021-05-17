from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import ListAPIView
from rest_framework.viewsets import ModelViewSet
from .models import Notification, Device
from .serializers import NotificationSerializer, DeviceSerializer
from common.abstract_models import IsCreator
from rest_framework.permissions import IsAuthenticated
from common.decorators_api_views import viewsets_swagger_decorator


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Notifications"]))
class NotificationList(ListAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [
        IsAuthenticated,
    ]

    def get_queryset(self):
        # Retrieve the received and viewed notifications for the user
        return (
            self.request.user.received_notifications.all()
            | self.request.user.viewed_notifications.all()
        )


@viewsets_swagger_decorator(["Notifications"])
class DeviceViewSet(ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
    permission_classes = [IsAuthenticated, IsCreator]
    pagination_class = None

    def get_queryset(self):
        # Retrieve the devices for the user
        return self.request.user.devices.all()
