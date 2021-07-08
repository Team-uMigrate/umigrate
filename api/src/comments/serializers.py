from .models import Comment, Reply
from rest_framework import serializers
from common.abstract_serializers import (
    AbstractSharedItemSerializer,
    AbstractSharedItemDetailSerializer,
)


class CommentSerializer(
    AbstractSharedItemSerializer
):  # todo: make more abstract model serializers for any field shared with the abstract model serializer
    """
    A serializer class for the Comment model.
    """

    replies = serializers.SerializerMethodField()
    # Todo: Maybe in the future
    # most_liked_reply = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = "__all__"
        exclude_fields = ["saved_users", "liked_users"]

    def get_replies(self, instance):
        return instance.replies.count()

    # def get_most_liked_reply(self, instance):
    #     # Retrieve the first most liked reply
    #     most_liked_reply: Reply = (
    #         instance.replies.annotate(likes=Count("liked_users"))
    #         .order_by("-likes", "-datetime_created")
    #         .first()
    #     )
    #
    #     if most_liked_reply is None:
    #         return None
    #
    #     most_liked_reply_serializer = ReplyDetailSerializer(
    #         most_liked_reply, context=self.context
    #     )
    #
    #     return most_liked_reply_serializer.data


class CommentDetailSerializer(CommentSerializer, AbstractSharedItemDetailSerializer):
    """
    A detailed serializer class for the Comment model.
    """

    pass


class ReplySerializer(AbstractSharedItemSerializer):
    """
    A serializer class for the Reply model.
    """

    class Meta:
        model = Reply
        fields = "__all__"
        exclude_fields = ["saved_users", "liked_users"]


class ReplyDetailSerializer(ReplySerializer, AbstractSharedItemDetailSerializer):
    """
    A detailed serializer class for the Reply model.
    """

    pass
