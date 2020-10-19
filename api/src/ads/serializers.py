from common.generics.generic_post_serializers import GenericPostSerializer, GenericCommentSerializer, \
    GenericPostDetailSerializer, GenericCommentDetailSerializer
from .models import Ad, AdComment


# Serializes the ad model
class AdSerializer(GenericPostSerializer):

    class Meta:
        model = Ad
        fields = '__all__'
        exclude_fields = ['saved_users', 'liked_users']


# Serializers the ad model with detail
class AdDetailSerializer(AdSerializer, GenericPostDetailSerializer):
    pass


# Serializes the ad comment model
class AdCommentSerializer(GenericCommentSerializer):

    class Meta:
        model = AdComment
        fields = '__all__'


# Serializers the ad comment model with detail
class AdCommentDetailSerializer(AdCommentSerializer, GenericCommentDetailSerializer):
    pass
