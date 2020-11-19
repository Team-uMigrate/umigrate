from common.abstract_serializers import ModelSerializerExtension
from users.serializers import BasicUserSerializer
from .models import Room, Message


# Serializes the room model
class RoomSerializer(ModelSerializerExtension):
    class Meta:
        model = Room
        fields = "__all__"

    def create(self, validated_data):
        validated_data["creator"] = self.context["request"].user
        return ModelSerializerExtension.create(self, validated_data)


# Serializes the previous replied message
class BasicMessageSerializer(ModelSerializerExtension):
    creator = BasicUserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = [
            "id",
            "content",
            "creator",
        ]


# Serializes the message model
class MessageSerializer(ModelSerializerExtension):
    creator = BasicUserSerializer(read_only=True)
    previous_message = BasicMessageSerializer(read_only=True)

    class Meta:
        model = Message
        fields = "__all__"
