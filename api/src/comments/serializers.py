from django.db.models import Count
from common.notification_helpers import create_tagged_user_notification
from .models import Comment, Reply
from users.serializers import BasicUserSerializer
from rest_framework import serializers
from common.serializer_extensions import ModelSerializerExtension


# A serializer class for the Comment model
class CommentSerializer(ModelSerializerExtension):
    creator = BasicUserSerializer(read_only=True)
    liked_users = BasicUserSerializer(read_only=True, many=True)
    is_liked = serializers.SerializerMethodField()
    is_saved = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()
    # Todo: Maybe in the future
    # most_liked_reply = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = "__all__"
        exclude_fields = ["saved_users", "liked_users"]

    def get_is_liked(self, instance):
        return instance.liked_users.filter(id=self.context["request"].user.id).exists()

    def get_is_saved(self, instance):
        return instance.saved_users.filter(id=self.context["request"].user.id).exists()

    def get_likes(self, instance):
        return instance.liked_users.count()

    def get_replies(self, instance):
        return instance.replies.count()

    def get_most_liked_reply(self, instance):
        most_liked_reply: Reply = (
            instance.replies.annotate(likes=Count("liked_users"))
            .order_by("-likes", "-datetime_created")
            .first()
        )

        if most_liked_reply is None:
            return None

        most_liked_reply_serializer = ReplyDetailSerializer(
            most_liked_reply, context=self.context
        )
        return most_liked_reply_serializer.data

    def create(self, validated_data):
        validated_data["creator"] = self.context["request"].user
        created_data: Comment = ModelSerializerExtension.create(self, validated_data)
        create_tagged_user_notification(created_data)
        return created_data


# A detailed serializer class for the Comment model
class CommentDetailSerializer(CommentSerializer):
    tagged_users = BasicUserSerializer(read_only=True, many=True)


# A serializer class for the Reply model
class ReplySerializer(ModelSerializerExtension):
    creator = BasicUserSerializer(read_only=True)
    liked_users = BasicUserSerializer(read_only=True, many=True)
    is_liked = serializers.SerializerMethodField()
    is_saved = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()

    class Meta:
        model = Reply
        fields = "__all__"
        exclude_fields = ["saved_users", "liked_users"]

    def get_is_liked(self, instance):
        return instance.liked_users.filter(id=self.context["request"].user.id).exists()

    def get_is_saved(self, instance):
        return instance.saved_users.filter(id=self.context["request"].user.id).exists()

    def get_likes(self, instance):
        return instance.liked_users.count()

    def create(self, validated_data):
        validated_data["creator"] = self.context["request"].user
        created_data: Reply = ModelSerializerExtension.create(self, validated_data)
        create_tagged_user_notification(created_data)
        return created_data


# A detailed serializer class for the Reply model
class ReplyDetailSerializer(ReplySerializer):
    tagged_users = BasicUserSerializer(read_only=True, many=True)
