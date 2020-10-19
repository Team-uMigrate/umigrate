from common.generics.generic_post_serializers import GenericPostSerializer, GenericPostDetailSerializer
from .models import Post


# Serializes the post model
class PostSerializer(GenericPostSerializer):

    class Meta:
        model = Post
        fields = '__all__'
        exclude_fields = ['saved_users', 'liked_users']


# Serializes the post model with detail
class PostDetailSerializer(PostSerializer, GenericPostDetailSerializer):
    pass
