from common.generics.generic_serializers import GenericSerializer
from .models import Listing, ListingComment


# Serializes the listing model
class ListingSerializer(GenericSerializer):

    class Meta:
        model = Listing
        fields = '__all__'


# Serializes the listing comment model
class ListingCommentSerializer(GenericSerializer):

    class Meta:
        model = ListingComment
        fields = '__all__'
