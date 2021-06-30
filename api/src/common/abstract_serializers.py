from common.abstract_models import AbstractPostModel
from comments.models import Comment, Reply
from users.serializers import BasicUserSerializer
from rest_framework import serializers
from common.serializer_extensions import ModelSerializerExtension
from photos.serializers import PhotoRetrieveSerializer
from common.notification_helpers import create_tagged_users_notification


class AbstractCreatorSerializer(ModelSerializerExtension):
    """
    An abstract model serializer class for models with a creator field.
    """

    creator = BasicUserSerializer(read_only=True)

    def create(self, validated_data):
        # Set the user as the creator of the shared item
        validated_data["creator"] = self.context["request"].user

        return ModelSerializerExtension.create(self, validated_data)


class AbstractModelSerializer(AbstractCreatorSerializer):
    """
    An abstract model serializer class for shared items.
    """

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

    def create(self, validated_data):
        created_data: AbstractPostModel or Comment or Reply = (
            AbstractCreatorSerializer.create(self, validated_data)
        )

        # Send a tagged users notification
        create_tagged_users_notification(created_data)

        return created_data

    # def get_most_liked_comment(self, instance):
    #     # Retrieve the first most liked comment
    #     most_liked_comment: Comment = (
    #         instance.comments.annotate(likes=Count("liked_users"))
    #         .order_by("-likes", "-datetime_created")
    #         .first()
    #     )
    #
    #     if most_liked_comment is None:
    #         return None
    #
    #     most_liked_comment_serializer = CommentDetailSerializer(
    #         most_liked_comment, context=self.context
    #     )
    #
    #     return most_liked_comment_serializer.data


class AbstractModelDetailSerializer(AbstractModelSerializer):
    """
    A detailed abstract model serializer class for shared items.
    """

    tagged_users = BasicUserSerializer(read_only=True, many=True)
    photos = PhotoRetrieveSerializer(read_only=True, many=True)


class AddRemoveUserSerializer(serializers.Serializer):
    """
    A serializer class for adding and removing user from a many to many field.
    """

    id = serializers.IntegerField(min_value=1)
    should_add = serializers.BooleanField()

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass
