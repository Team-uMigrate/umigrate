from common.abstract_serializers import ModelSerializerExtension
from users.serializers import BasicUserSerializer
from .models import Room, Message


class RoomSerializer(ModelSerializerExtension):
    """
    A serializer class for the Room model.
    """

    class Meta:
        model = Room
        fields = "__all__"

    def create(self, validated_data):
        created_data: Room = ModelSerializerExtension.create(self, validated_data)

        # Set the user as a member of the room
        created_data.members.add(
            self.context["request"].user
        )  # todo: use membership_set instead of members. Figure out what needs to be passed as an argument(s)

        return created_data


class RoomDetailSerializer(RoomSerializer):
    """
    A detailed serializer class for the Room model.
    """

    members = BasicUserSerializer(read_only=True, many=True)


class BasicMessageSerializer(ModelSerializerExtension):
    """
    A basic serializer class for the Message model.
    """

    creator = BasicUserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = [
            "id",
            "content",
            "creator",
        ]


class MessageSerializer(ModelSerializerExtension):
    """
    A serializer class for the Message model.
    """

    creator = BasicUserSerializer(read_only=True)
    previous_message = BasicMessageSerializer(read_only=True)

    class Meta:
        model = Message
        fields = "__all__"
