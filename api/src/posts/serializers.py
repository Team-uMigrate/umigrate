from common.generics.generic_serializers import GenericSerializer
from .models import Post, PostComment


class PostSerializer(GenericSerializer):

    class Meta:
        model = Post
        fields = '__all__'


class PostCommentSerializer(GenericSerializer):

    class Meta:
        model = PostComment
        fields = '__all__'
