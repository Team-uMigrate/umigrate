from common.generics.generic_serializers import GenericPostSerializer, GenericCommentSerializer
from .models import Event, EventComment


# Serializes the event model
class EventSerializer(GenericPostSerializer):

    class Meta:
        model = Event
        fields = '__all__'


# Serializes the event model
class EventCommentSerializer(GenericCommentSerializer):

    class Meta:
        model = EventComment
        fields = '__all__'
