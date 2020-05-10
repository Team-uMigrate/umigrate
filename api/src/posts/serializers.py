from common.generics.generic_serializers import GenericSerializer
from .models import Post, PostComment


# Serializes the post model
class PostSerializer(GenericSerializer):

    class Meta:
        model = Post
        fields = '__all__'


# Serializes the post comment model
class PostCommentSerializer(GenericSerializer):

    class Meta:
        model = PostComment
        fields = '__all__'
