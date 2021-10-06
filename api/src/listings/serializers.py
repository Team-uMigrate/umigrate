from common.abstract_serializers import (
    AbstractPostSerializer,
    AbstractPostDetailSerializer,
)
from .models import Listing, RoommatePost


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


class RoommateSerializer(AbstractPostSerializer):
    """
    A serializer class for the Roommate model.
    """

    class Meta:
        model = RoommatePost
        fields = "__all__"
        exclude_fields = ["saved_users", "liked_users"]


class RoommateDetailSerializer(RoommateSerializer, AbstractPostDetailSerializer):
    """
    A detailed serializer class for the Roommate model.
    """

    pass
