from common.generics.generic_serializers import GenericPostSerializer, GenericCommentSerializer
from .models import Ad, AdComment


# Serializes the ad model
class AdSerializer(GenericPostSerializer):

    class Meta:
        model = Ad
        fields = '__all__'


# Serializes the ad comment model
class AdCommentSerializer(GenericCommentSerializer):

    class Meta:
        model = AdComment
        fields = '__all__'
