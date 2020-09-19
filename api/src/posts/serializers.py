from common.generics.generic_serializers import GenericPostSerializer, GenericCommentSerializer
from .models import Post, PostComment


# Serializes the post model
class PostSerializer(GenericPostSerializer):

    class Meta:
        model = Post
        fields = '__all__'


# Serializes the post comment model
class PostCommentSerializer(GenericCommentSerializer):

    class Meta:
        model = PostComment
        fields = '__all__'
