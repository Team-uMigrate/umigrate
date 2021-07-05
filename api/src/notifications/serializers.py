from rest_framework import serializers
from common.serializer_extensions import ModelSerializerExtension
from notifications.models import Device, Notification
from users.models import CustomUser
from users.serializers import BasicUserSerializer


class NotificationSerializer(ModelSerializerExtension):
    """
    A serializer class for the Notification model.
    """

    creator = BasicUserSerializer(read_only=True)
    is_viewed = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = "__all__"
        exclude_fields = ["receivers", "viewers"]

    def get_is_viewed(self, instance: Notification) -> bool:
        return instance.viewers.filter(id=self.context["request"].user.id).exists()


class DeviceSerializer(ModelSerializerExtension):
    """
    A serializer class for the Device model.
    """

    class Meta:
        model = Device
        fields = "__all__"

    creator = BasicUserSerializer(read_only=True)

    def create(self, validated_data):
        # Set the user as the creator of the shared item
        validated_data["creator"] = self.context["request"].user

        return ModelSerializerExtension.create(self, validated_data)


class ReceivedNotificationsSerializer(ModelSerializerExtension):
    """
    A serializer class for received notifications.
    """

    class Meta:
        model = CustomUser
        fields = ["received_notifications"]
