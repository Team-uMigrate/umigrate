from django.db.models.functions import Length
from .models import Comment
from users.serializers import BasicUserSerializer
from rest_framework import serializers
from common.generics.generic_serializers import GenericSerializer


# Serializes the reply model with detail
class CommentSerializer(GenericSerializer):
    creator = BasicUserSerializer(read_only=True)
    liked_users = BasicUserSerializer(read_only=True, many=True)
    is_liked = serializers.SerializerMethodField()
    is_saved = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()
    most_liked_reply = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = '__all__'
        exclude_fields = ['saved_users', 'liked_users']

    def get_is_liked(self, instance):
        return instance.liked_users.filter(id=self.context['request'].user.id).exists()

    def get_is_saved(self, instance):
        return instance.saved_users.filter(id=self.context['request'].user.id).exists()

    def get_likes(self, instance):
        return instance.liked_users.count()

    def get_replies(self, instance):
        return instance.reply_set.count()

    def get_most_liked_reply(self, instance):
        most_liked_reply = instance.comment_set.order_by(Length('liked_users').desc(), '-datetime_created').first()
        most_liked_reply_serializer = ReplySerializer(most_liked_reply, context=self.context)
        return most_liked_reply_serializer.data

    def create(self, validated_data):
        validated_data['creator'] = self.context['request'].user
        return GenericSerializer.create(self, validated_data)


# Serializes the comment model with detail
class CommentDetailSerializer(CommentSerializer):
    tagged_users = BasicUserSerializer(read_only=True, many=True)


# Serializes the reply model
class ReplySerializer(GenericSerializer):
    creator = BasicUserSerializer(read_only=True)
    liked_users = BasicUserSerializer(read_only=True, many=True)
    is_liked = serializers.SerializerMethodField()
    is_saved = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = '__all__'
        exclude_fields = ['saved_users', 'liked_users']

    def get_is_liked(self, instance):
        return instance.liked_users.filter(id=self.context['request'].user.id).exists()

    def get_is_saved(self, instance):
        return instance.saved_users.filter(id=self.context['request'].user.id).exists()

    def get_likes(self, instance):
        return instance.liked_users.count()

    def create(self, validated_data):
        validated_data['creator'] = self.context['request'].user
        return GenericSerializer.create(self, validated_data)


# Serializes the reply model with detail
class ReplyDetailSerializer(CommentSerializer):
    tagged_users = BasicUserSerializer(read_only=True, many=True)
