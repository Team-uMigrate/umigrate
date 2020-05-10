from common.generics.generic_serializers import GenericSerializer
from rest_framework import serializers
from users.models import CustomUser


# Serializes the custom user model
class UserSerializer(GenericSerializer):
    email = serializers.ReadOnlyField()

    class Meta:
        model = CustomUser
        fields = '__all__'
        exclude_fields = [
            'password',
            'last_login',
            'is_superuser',
            'is_staff',
            'is_active',
            'date_joined',
            'groups',
            'user_permissions',
            'notification_privacy',
            'allow_location',
            'currency',
            'language',
            'dark_theme',
            'followed_users',
            'blocked_users',
            'user_permissions',
        ]


# Serializes the custom user model with user settings fields
class UserDetailSerializer(GenericSerializer):
    email = serializers.ReadOnlyField()

    class Meta:
        model = CustomUser
        fields = '__all__'
        exclude_fields = [
            'password',
            'is_superuser',
            'is_staff',
            'is_active',
            'date_joined',
            'groups',
            'user_permissions',
        ]
