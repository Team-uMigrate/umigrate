from users.serializers import BasicUserSerializer
from rest_framework import serializers
from .generic_serializers import GenericSerializer
from photos.serializers import PhotoRetrieveSerializer


# Serializes a generic resource model
class GenericPostSerializer(GenericSerializer):
    creator = BasicUserSerializer(read_only=True)
    liked_users = BasicUserSerializer(read_only=True, many=True)
    is_liked = serializers.SerializerMethodField()
    is_saved = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    def get_is_liked(self, instance):
        return instance.liked_users.filter(id=self.context['request'].user.id).exists()

    def get_is_saved(self, instance):
        return instance.saved_users.filter(id=self.context['request'].user.id).exists()

    def get_likes(self, instance):
        return instance.liked_users.count()

    def get_comments(self, instance):
        return instance.comment_set.count()

    def create(self, validated_data):
        validated_data['creator'] = self.context['request'].user
        return GenericSerializer.create(self, validated_data)


# Serializes a generic resource model with detail
class GenericPostDetailSerializer(GenericPostSerializer):
    tagged_users = BasicUserSerializer(read_only=True, many=True)
    photos = PhotoRetrieveSerializer(read_only=True, many=True)


# Serializes a generic comment model
class GenericCommentSerializer(GenericSerializer):
    creator = BasicUserSerializer(read_only=True)
    liked_users = BasicUserSerializer(read_only=True, many=True)
    is_liked = serializers.SerializerMethodField()
    is_saved = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()

    def get_is_liked(self, instance):
        return instance.liked_users.filter(id=self.context['request'].user.id).exists()

    def get_is_saved(self, instance):
        return instance.saved_users.filter(id=self.context['request'].user.id).exists()

    def get_likes(self, instance):
        return instance.liked_users.count()

    def create(self, validated_data):
        validated_data['creator'] = self.context['request'].user
        return GenericSerializer.create(self, validated_data)


# Serializes a generic resource model with detail
class GenericCommentDetailSerializer(GenericCommentSerializer):
    tagged_users = BasicUserSerializer(read_only=True, many=True)
