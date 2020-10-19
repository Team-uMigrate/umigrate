from common.generics.generic_post_serializers import GenericPostSerializer, GenericCommentSerializer, \
    GenericPostDetailSerializer, GenericCommentDetailSerializer
from .models import Listing


# Serializes the listing model
class ListingSerializer(GenericPostSerializer):

    class Meta:
        model = Listing
        fields = '__all__'
        exclude_fields = ['saved_users', 'liked_users']


# Serializes the listing model with detail
class ListingDetailSerializer(ListingSerializer, GenericPostDetailSerializer):
    pass
