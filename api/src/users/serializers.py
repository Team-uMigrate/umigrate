from common.generics.generic_serializers import GenericSerializer
from rest_framework import serializers
from users.models import CustomUser


# Serializes the custom user model
class UserSerializer(GenericSerializer):
    email = serializers.ReadOnlyField()
    is_connected = serializers.SerializerMethodField()
    is_blocked = serializers.SerializerMethodField()
    connected = serializers.SerializerMethodField()

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
            'connected_users',
            'blocked_users',
            'user_permissions',
        ]

    def get_is_connected(self, instance):
        return self.context['request'].user.connected_users.filter(id=instance.id).exists()

    def get_is_blocked(self, instance):
        return self.context['request'].user.blocked_users.filter(id=instance.id).exists()

    def get_connected(self, instance):
        return instance.connected_users.count()


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


# Serializes the user model with basic information
class BasicUserSerializer(GenericSerializer):
    is_connected = serializers.SerializerMethodField()
    is_blocked = serializers.SerializerMethodField()

    # photo -> profile and background photo
    class Meta:
        model = CustomUser
        fields = [
            'id',
            'preferred_name',
            'profile_photo',
            'background_photo',
            'is_connected',
            'is_blocked',
        ]

    def get_is_connected(self, instance):
        return self.context['request'].user.connected_users.filter(id=instance.id).exists()

    def get_is_blocked(self, instance):
        return self.context['request'].user.blocked_users.filter(id=instance.id).exists()
