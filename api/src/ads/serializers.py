from common.abstract_serializers import (
    AbstractModelSerializer,
    AbstractModelDetailSerializer,
)
from .models import Ad


class AdSerializer(AbstractModelSerializer):
    """
    A serializer class for the Ad model.
    """

    class Meta:
        model = Ad
        fields = "__all__"
        exclude_fields = ["saved_users", "liked_users"]


class AdDetailSerializer(AdSerializer, AbstractModelDetailSerializer):
    """
    A detailed serializer class for the Ad model.
    """

    pass
