from common.generics.generic_serializers import GenericSerializer
from .models import Event, EventComment


# Serializes the event model
class EventSerializer(GenericSerializer):

    class Meta:
        model = Event
        fields = '__all__'


# Serializes the event model
class EventCommentSerializer(GenericSerializer):

    class Meta:
        model = EventComment
        fields = '__all__'
