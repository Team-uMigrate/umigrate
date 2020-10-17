from common.generics.generic_post_serializers import GenericPostSerializer, GenericCommentSerializer, \
    GenericPostDetailSerializer, GenericCommentDetailSerializer
from .models import Post, PostComment
from api.src.posts.models import PostCommentReply


# Serializes the post model
class PostSerializer(GenericPostSerializer):

    class Meta:
        model = Post
        fields = '__all__'


# Serializes the post model with detail
class PostDetailSerializer(PostSerializer, GenericPostDetailSerializer):
    pass


# Serializes the post comment model
class PostCommentSerializer(GenericCommentSerializer):

    class Meta:
        model = PostComment
        fields = '__all__'

class PostCommentReplySerializer(GenericCommentSerializer):
    class Meta:
        model = PostCommentReply
        fields = '__all__'

# Serializes the post model with detail
class PostCommentDetailSerializer(PostCommentSerializer, GenericCommentDetailSerializer):
    pass
