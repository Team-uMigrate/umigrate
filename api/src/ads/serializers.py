from common.abstract_serializers import (
    AbstractModelSerializer,
    AbstractModelDetailSerializer,
)
from .models import Ad


# Serializes the ad model
class AdSerializer(AbstractModelSerializer):
    class Meta:
        model = Ad
        fields = "__all__"
        exclude_fields = ["saved_users", "liked_users"]


# Serializers the ad model with detail
class AdDetailSerializer(AdSerializer, AbstractModelDetailSerializer):
    pass
