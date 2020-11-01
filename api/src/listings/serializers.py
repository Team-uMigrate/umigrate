from common.abstract_serializers import (
    AbstractModelSerializer,
    AbstractModelDetailSerializer,
)
from .models import Listing


# Serializes the listing model
class ListingSerializer(AbstractModelSerializer):
    class Meta:
        model = Listing
        fields = "__all__"
        exclude_fields = ["saved_users", "liked_users"]


# Serializes the listing model with detail
class ListingDetailSerializer(ListingSerializer, AbstractModelDetailSerializer):
    pass
