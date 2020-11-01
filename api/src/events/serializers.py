from common.abstract_serializers import (
    AbstractModelSerializer,
    AbstractModelDetailSerializer,
)
from .models import Event
from rest_framework import serializers


# Serializes the event model
class EventSerializer(AbstractModelSerializer):
    is_interested = serializers.SerializerMethodField()
    is_attending = serializers.SerializerMethodField()
    interested = serializers.SerializerMethodField()
    attending = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = "__all__"
        exclude_fields = [
            "saved_users",
            "liked_users",
            "interested_users",
            "attending_users",
        ]

    def get_is_interested(self, instance):
        return instance.interested_users.filter(
            id=self.context["request"].user.id
        ).exists()

    def get_is_attending(self, instance):
        return instance.attending_users.filter(
            id=self.context["request"].user.id
        ).exists()

    def get_interested(self, instance):
        return instance.interested_users.count()

    def get_attending(self, instance):
        return instance.attending_users.count()


# Serializes the event model with detail
class EventDetailSerializer(EventSerializer, AbstractModelDetailSerializer):
    pass
