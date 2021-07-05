from common.abstract_serializers import (
    AbstractPostSerializer,
    AbstractPostDetailSerializer,
)
from .models import Listing


class ListingSerializer(AbstractPostSerializer):
    """
    A serializer class for the Listing model.
    """

    class Meta:
        model = Listing
        fields = "__all__"
        exclude_fields = ["saved_users", "liked_users"]


class ListingDetailSerializer(ListingSerializer, AbstractPostDetailSerializer):
    """
    A detailed serializer class for the Listing model.
    """

    pass
