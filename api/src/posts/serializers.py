from rest_framework.renderers import JSONRenderer
from common.generics.generic_post_serializers import GenericPostSerializer, GenericCommentSerializer, \
    GenericPostDetailSerializer, GenericCommentDetailSerializer
from .models import Post, PostComment, PostCommentReply
from django.db.models.functions import Length
from rest_framework import serializers


# Serializes the post model
class PostSerializer(GenericPostSerializer):
    most_liked_comment = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'
        exclude_fields = ['saved_users', 'liked_users']

    def get_most_liked_comment(self, instance):
        most_liked_comment = instance.comment_set.order_by(Length('liked_users').desc(), '-datetime_created').first()
        most_liked_comment_serializer = PostCommentSerializer(most_liked_comment, context=self.context)
        return most_liked_comment_serializer.data


# Serializes the post model with detail
class PostDetailSerializer(PostSerializer, GenericPostDetailSerializer):
    pass

#Serializes the post comment reply model
class PostCommentReplySerializer(GenericCommentSerializer):
    class Meta:
        model = PostCommentReply
        fields = '__all__'

# Serializes the post comment model
class PostCommentSerializer(GenericCommentSerializer):
    reply_set = PostCommentReplySerializer(read_only=True,many=True)
    class Meta:
        model = PostComment
        fields = '__all__'
        extra_fields = ['reply_set']

# Serializes the post model with detail
class PostCommentDetailSerializer(PostCommentSerializer, GenericCommentDetailSerializer):
    pass

# Serializes the post comment reply model with detail
class PostCommentReplyDetailSerializer(PostCommentReplySerializer, GenericCommentDetailSerializer):
    pass