from django.db.models.functions import Length
from comments.serializers import CommentDetailSerializer
from users.serializers import BasicUserSerializer
from rest_framework import serializers
from common.serializer_extensions import ModelSerializerExtension
from photos.serializers import PhotoRetrieveSerializer


# Serializes an abstract resource model
class AbstractModelSerializer(ModelSerializerExtension):
    creator = BasicUserSerializer(read_only=True)
    liked_users = BasicUserSerializer(read_only=True, many=True)
    is_liked = serializers.SerializerMethodField()
    is_saved = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    most_liked_comment = serializers.SerializerMethodField()

    def get_is_liked(self, instance):
        return instance.liked_users.filter(id=self.context['request'].user.id).exists()

    def get_is_saved(self, instance):
        return instance.saved_users.filter(id=self.context['request'].user.id).exists()

    def get_likes(self, instance):
        return instance.liked_users.count()

    def get_comments(self, instance):
        return instance.comments.count()

    def get_most_liked_comment(self, instance):
        most_liked_comment = instance.comments.order_by(Length('liked_users').desc(), '-datetime_created').first()

        if most_liked_comment is None:
            return None

        most_liked_comment_serializer = CommentDetailSerializer(most_liked_comment, context=self.context)
        return most_liked_comment_serializer.data

    def create(self, validated_data):
        validated_data['creator'] = self.context['request'].user
        return ModelSerializerExtension.create(self, validated_data)


# Serializes an abstract resource model with detail
class AbstractModelDetailSerializer(AbstractModelSerializer):
    tagged_users = BasicUserSerializer(read_only=True, many=True)
    photos = PhotoRetrieveSerializer(read_only=True, many=True)
