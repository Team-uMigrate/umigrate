from common.abstract_serializers import ModelSerializerExtension
from .models import Room, Message


# Serializes the room model
class RoomSerializer(ModelSerializerExtension):

    class Meta:
        model = Room
        fields = '__all__'

    def create(self, validated_data):
        validated_data['creator'] = self.context['request'].user
        return ModelSerializerExtension.create(self, validated_data)


# Serializes the message model
class MessageSerializer(ModelSerializerExtension):

    class Meta:
        model = Message
        fields = '__all__'
