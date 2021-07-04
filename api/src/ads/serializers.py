from common.abstract_serializers import (
    AbstractPostSerializer,
    AbstractPostDetailSerializer,
)
from .models import Ad


class AdSerializer(AbstractPostSerializer):
    """
    A serializer class for the Ad model.
    """

    class Meta:
        model = Ad
        fields = "__all__"
        exclude_fields = ["saved_users", "liked_users"]


class AdDetailSerializer(AdSerializer, AbstractPostDetailSerializer):
    """
    A detailed serializer class for the Ad model.
    """

    pass
