from common.generics.generic_serializers import GenericSerializer
from .models import Ad, AdComment


# Serializes the ad model
class AdSerializer(GenericSerializer):

    class Meta:
        model = Ad
        fields = '__all__'


# Serializes the ad comment model
class AdCommentSerializer(GenericSerializer):

    class Meta:
        model = AdComment
        fields = '__all__'
