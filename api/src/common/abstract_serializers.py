from django.db.models import Count
from comments.models import Comment
from comments.serializers import CommentDetailSerializer
from common.abstract_models import AbstractPostModel
from users.serializers import BasicUserSerializer
from rest_framework import serializers
from common.serializer_extensions import ModelSerializerExtension
from photos.serializers import PhotoRetrieveSerializer
from common.notification_helpers import create_tagged_user_notification


# An abstract serializer class for shared items
class AbstractModelSerializer(ModelSerializerExtension):
    creator = BasicUserSerializer(read_only=True)
    liked_users = BasicUserSerializer(read_only=True, many=True)
    is_liked = serializers.SerializerMethodField()
    is_saved = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    # Todo: Maybe in the future
    # most_liked_comment = serializers.SerializerMethodField()

    def get_is_liked(self, instance):
        return instance.liked_users.filter(id=self.context["request"].user.id).exists()

    def get_is_saved(self, instance):
        return instance.saved_users.filter(id=self.context["request"].user.id).exists()

    def get_likes(self, instance):
        return instance.liked_users.count()

    def get_comments(self, instance):
        return instance.comments.count()

    def get_most_liked_comment(self, instance):
        # Retrieve the first most liked comment
        most_liked_comment: Comment = (
            instance.comments.annotate(likes=Count("liked_users"))
            .order_by("-likes", "-datetime_created")
            .first()
        )

        if most_liked_comment is None:
            return None

        most_liked_comment_serializer = CommentDetailSerializer(
            most_liked_comment, context=self.context
        )
        return most_liked_comment_serializer.data

    def create(self, validated_data):
        # Set the user as the creator of the shared item
        validated_data["creator"] = self.context["request"].user

        created_data: AbstractPostModel = ModelSerializerExtension.create(
            self, validated_data
        )
        create_tagged_user_notification(created_data)

        return created_data


# A detailed abstract serializer class for shared items
class AbstractModelDetailSerializer(AbstractModelSerializer):
    tagged_users = BasicUserSerializer(read_only=True, many=True)
    photos = PhotoRetrieveSerializer(read_only=True, many=True)


# A serializer class for adding and removing user from a many to many field
class AddRemoveUserSerializer(serializers.Serializer):
    id = serializers.IntegerField(min_value=1)
    should_add = serializers.BooleanField()

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass
