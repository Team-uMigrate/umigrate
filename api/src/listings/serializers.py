from common.abstract_serializers import (
    AbstractModelSerializer,
    AbstractModelDetailSerializer,
)
from .models import Listing


# A serializer class for the Listing model
class ListingSerializer(AbstractModelSerializer):
    class Meta:
        model = Listing
        fields = "__all__"
        exclude_fields = ["saved_users", "liked_users"]


# A detailed serializer class for the Listing model
class ListingDetailSerializer(ListingSerializer, AbstractModelDetailSerializer):
    pass
