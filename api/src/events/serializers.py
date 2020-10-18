from common.generics.generic_post_serializers import GenericPostSerializer, GenericCommentSerializer, \
    GenericPostDetailSerializer, GenericCommentDetailSerializer
from users.serializers import BasicUserSerializer
from .models import Event, EventComment
from rest_framework import serializers


# Serializes the event model hehe xd
class EventSerializer(GenericPostSerializer):
    is_interested = serializers.SerializerMethodField()
    is_attending = serializers.SerializerMethodField()
    interested = serializers.SerializerMethodField()
    attending = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = '__all__'
        exclude_fields = ['interested_users', 'attending_users', 'liked_users']

    def get_is_interested(self, instance):
        return instance.interested_users.filter(id=self.context['request'].user.id).exists()

    def get_is_attending(self, instance):
        return instance.attending_users.filter(id=self.context['request'].user.id).exists()

    def get_interested(self, instance):
        return instance.interested_users.count()

    def get_attending(self, instance):
        return instance.attending_users.count()


# Serializes the event model with detail
class EventDetailSerializer(EventSerializer, GenericPostDetailSerializer):
    interested_users = BasicUserSerializer(read_only=True, many=True)
    attending_users = BasicUserSerializer(read_only=True, many=True)


# Serializes the event model
class EventCommentSerializer(GenericCommentSerializer):

    class Meta:
        model = EventComment
        fields = '__all__'


# Serializes the event comment model with detail
class EventCommentDetailSerializer(EventCommentSerializer, GenericCommentDetailSerializer):
    pass
