from common.generics.generic_serializers import GenericSerializer
from .models import Room, Message


# Serializes the room model
class RoomSerializer(GenericSerializer):

    class Meta:
        model = Room
        fields = '__all__'


# Serializes the message model
class MessageSerializer(GenericSerializer):

    class Meta:
        model = Message
        fields = '__all__'
