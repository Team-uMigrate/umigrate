from django.contrib.auth import authenticate
from django.utils.translation import ugettext_lazy as _
from rest_framework import exceptions
from common.serializer_extensions import ModelSerializerExtension
from rest_framework import serializers
from users.models import CustomUser


# Serializes the custom user model
class UserSerializer(ModelSerializerExtension):
    email = serializers.ReadOnlyField()
    is_connected = serializers.SerializerMethodField()
    is_blocked = serializers.SerializerMethodField()
    connected = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = "__all__"
        exclude_fields = [
            "password",
            "last_login",
            "is_superuser",
            "is_staff",
            "is_active",
            "date_joined",
            "groups",
            "user_permissions",
            "notification_privacy",
            "allow_location",
            "currency",
            "language",
            "dark_theme",
            "connected_users",
            "blocked_users",
            "user_permissions",
        ]

    def get_is_connected(self, instance):
        return (
            self.context["request"].user.connected_users.filter(id=instance.id).exists()
        )

    def get_is_blocked(self, instance):
        return (
            self.context["request"].user.blocked_users.filter(id=instance.id).exists()
        )

    def get_connected(self, instance):
        return instance.connected_users.count()


# Serializes the custom user model with user settings fields
class UserDetailSerializer(ModelSerializerExtension):
    email = serializers.ReadOnlyField()

    class Meta:
        model = CustomUser
        fields = "__all__"
        exclude_fields = [
            "password",
            "is_superuser",
            "is_staff",
            "is_active",
            "date_joined",
            "groups",
            "user_permissions",
        ]


# Serializes the user model with basic information
class BasicUserSerializer(ModelSerializerExtension):
    is_connected = serializers.SerializerMethodField()
    is_blocked = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "preferred_name",
            "profile_photo",
            "background_photo",
            "is_connected",
            "is_blocked",
        ]

    def get_is_connected(self, instance):
        return (
            self.context["request"].user.connected_users.filter(id=instance.id).exists()
        )

    def get_is_blocked(self, instance):
        return (
            self.context["request"].user.blocked_users.filter(id=instance.id).exists()
        )


# Serializer for the login view
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(style={"input_type": "password"})

    def authenticate(self, **kwargs):
        return authenticate(self.context["request"], **kwargs)

    def _validate_email(self, email, password):
        user = None

        if email and password:
            user = self.authenticate(email=email, password=password)
        else:
            msg = _('Must include "email" and "password".')
            raise exceptions.ValidationError(msg)

        return user

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user = None

        user = self._validate_email(email, password)

        if user:
            if not user.is_active:
                msg = _("User account is disabled.")
                raise exceptions.ValidationError(msg)
        else:
            msg = _("Unable to log in with provided credentials.")
            raise exceptions.ValidationError(msg)

        email_address = user.emailaddress_set.get(email=user.email)
        if not email_address.verified:
            raise serializers.ValidationError(_("E-mail is not verified."))

        attrs["user"] = user
        return attrs
