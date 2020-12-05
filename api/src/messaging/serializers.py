from common.abstract_serializers import ModelSerializerExtension
from users.serializers import BasicUserSerializer
from .models import Room, Message


# Serializes the room model
class RoomSerializer(ModelSerializerExtension):
    class Meta:
        model = Room
        fields = "__all__"

    def create(self, validated_data):
        created_data = ModelSerializerExtension.create(self, validated_data)
        created_data.members.add(self.context["request"].user)
        return created_data

    def update(self, instance, validated_data):
        for member in instance.members.all():
            if (
                "members" in validated_data
                and member not in validated_data["members"]
                and member != self.context["request"].user
            ):
                validated_data["members"].append(member)
        return ModelSerializerExtension.update(self, instance, validated_data)


class RoomDetailSerializer(RoomSerializer):
    members = BasicUserSerializer(read_only=True, many=True)


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
