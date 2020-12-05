from rest_framework.generics import ListAPIView
from rest_framework.viewsets import ModelViewSet
from .models import Notification, Device
from .serializers import NotificationSerializer, DeviceSerializer
from common.abstract_models import IsCreator
from rest_framework.permissions import IsAuthenticated


class NotificationList(ListAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer


class DeviceViewSet(ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
    permission_classes = [IsAuthenticated, IsCreator]
    pagination_class = None
