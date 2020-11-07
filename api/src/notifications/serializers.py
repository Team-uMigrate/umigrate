from common.serializer_extensions import ModelSerializerExtension
from notifications.models import Device, Notification


class NotificationSerializer(ModelSerializerExtension):
    class Meta:
        model = Notification
        fields = "__all__"
        exclude_fields = ["receivers", "viewers"]


class DeviceSerializer(ModelSerializerExtension):
    class Meta:
        model = Device
        fields = "__all__"
