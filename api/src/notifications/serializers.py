from common.serializer_extensions import ModelSerializerExtension
from common.abstract_serializers import AbstractCreatorSerializer
from notifications.models import Device, Notification
from users.serializers import BasicUserSerializer


class NotificationSerializer(ModelSerializerExtension):
    """
    A serializer class for the Notification model.
    """

    creator = BasicUserSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = "__all__"
        exclude_fields = ["receivers", "viewers"]


class DeviceSerializer(AbstractCreatorSerializer):
    """
    A serializer class for the Device model.
    """

    class Meta:
        model = Device
        fields = "__all__"
