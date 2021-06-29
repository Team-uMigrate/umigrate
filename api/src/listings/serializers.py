from common.abstract_serializers import (
    AbstractModelSerializer,
    AbstractModelDetailSerializer,
)
from .models import Listing


class ListingSerializer(AbstractModelSerializer):
    """
    A serializer class for the Listing model.
    """

    class Meta:
        model = Listing
        fields = "__all__"
        exclude_fields = ["saved_users", "liked_users"]


class ListingDetailSerializer(ListingSerializer, AbstractModelDetailSerializer):
    """
    A detailed serializer class for the Listing model.
    """

    pass
