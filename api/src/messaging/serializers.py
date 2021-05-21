from common.abstract_serializers import ModelSerializerExtension
from users.serializers import BasicUserSerializer
from .models import Room, Message, Membership

from rest_framework import serializers

# Membership serializer to relate the date joined to each member
class MembershipSerializer(ModelSerializerExtension):
    class Meta:
        model = Membership
        fields = "__all__"
        exclude_fields = ["id"]


# A serializer class for the Room model
class RoomSerializer(ModelSerializerExtension):
    class Meta:
        model = Room
        fields = "__all__"

    def create(self, validated_data):
        created_data: Room = ModelSerializerExtension.create(self, validated_data)

        # Set the user as a member of the room
        created_data.members.add(self.context["request"].user)

        return created_data


# A detailed serializer class for the Room model
class RoomDetailSerializer(RoomSerializer):
    members = BasicUserSerializer(read_only=True, many=True)


# A basic serializer class for the Message model
class BasicMessageSerializer(ModelSerializerExtension):
    creator = BasicUserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = [
            "id",
            "content",
            "creator",
        ]


# A serializer class for the Message model
class MessageSerializer(ModelSerializerExtension):
    creator = BasicUserSerializer(read_only=True)
    previous_message = BasicMessageSerializer(read_only=True)

    class Meta:
        model = Message
        fields = "__all__"
