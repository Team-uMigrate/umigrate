from common.abstract_serializers import GenericSerializer
from .models import Room, Message


# Serializes the room model
class RoomSerializer(GenericSerializer):

    class Meta:
        model = Room
        fields = '__all__'

    def create(self, validated_data):
        validated_data['creator'] = self.context['request'].user
        return GenericSerializer.create(self, validated_data)


# Serializes the message model
class MessageSerializer(GenericSerializer):

    class Meta:
        model = Message
        fields = '__all__'
