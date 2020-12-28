from common.abstract_serializers import (
    AbstractModelSerializer,
    AbstractModelDetailSerializer,
)
from .models import Ad


# A serializer class for the Ad model
class AdSerializer(AbstractModelSerializer):
    class Meta:
        model = Ad
        fields = "__all__"
        exclude_fields = ["saved_users", "liked_users"]


# A detailed serializer class for the Ad model
class AdDetailSerializer(AdSerializer, AbstractModelDetailSerializer):
    pass
