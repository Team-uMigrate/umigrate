from common.serializer_extensions import ModelSerializerExtension
from notifications.models import Device, Notification
from users.serializers import BasicUserSerializer


class NotificationSerializer(ModelSerializerExtension):
    creator = BasicUserSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = "__all__"
        exclude_fields = ["receivers", "viewers"]


class DeviceSerializer(ModelSerializerExtension):
    creator = BasicUserSerializer(read_only=True)

    class Meta:
        model = Device
        fields = "__all__"

    def create(self, validated_data):
        validated_data["creator"] = self.context["request"].user
        return ModelSerializerExtension.create(self, validated_data)