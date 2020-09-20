from common.generics.generic_serializers import GenericPostSerializer, GenericCommentSerializer
from .models import Listing, ListingComment


# Serializes the listing model
class ListingSerializer(GenericPostSerializer):

    class Meta:
        model = Listing
        fields = '__all__'


# Serializes the listing comment model
class ListingCommentSerializer(GenericCommentSerializer):

    class Meta:
        model = ListingComment
        fields = '__all__'
