from common.generics.generic_serializers import GenericPostSerializer, GenericCommentSerializer
from .models import Event, EventComment
from rest_framework import serializers


# Serializes the event model
class EventSerializer(GenericPostSerializer):
    is_interested = serializers.SerializerMethodField()
    is_attending = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = '__all__'

    def get_is_interested(self, instance):
        return instance.interested_users.filter(id=self.context['request'].user.id).exists()

    def get_is_attending(self, instance):
        return instance.attending_users.filter(id=self.context['request'].user.id).exists()


# Serializes the event model
class EventCommentSerializer(GenericCommentSerializer):

    class Meta:
        model = EventComment
        fields = '__all__'
