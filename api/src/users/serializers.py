from django.contrib.auth import authenticate
from django.utils.translation import ugettext_lazy as _
from rest_framework import exceptions
from common.serializer_extensions import ModelSerializerExtension
from rest_framework import serializers
from users.models import CustomUser
from common.constants.choices import Choices


class BasicUserSerializer(ModelSerializerExtension):
    """
    A basic serializer class for the CustomUser model.
    """

    connection_status = serializers.SerializerMethodField()
    is_blocked = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "preferred_name",
            "profile_photo",
            "background_photo",
            "connection_status",
            "is_blocked",
        ]

    def get_connection_status(self, instance):
        user = self.context["request"].user
        received = instance.connected_users.filter(id=user.id).exists()
        sent = user.connected_users.filter(id=instance.id).exists()

        if received and sent:
            return Choices.CONNECTION_STATUS_CHOICES["Connected"]

        if sent:
            return Choices.CONNECTION_STATUS_CHOICES["Request Sent"]

        if received:
            return Choices.CONNECTION_STATUS_CHOICES["Request Received"]

        return Choices.CONNECTION_STATUS_CHOICES["Not Connected"]

    def get_is_blocked(self, instance):
        return (
            self.context["request"].user.blocked_users.filter(id=instance.id).exists()
        )


class UserSerializer(BasicUserSerializer):
    """
    A serializer class for the CustomUser model.
    """

    email = serializers.ReadOnlyField()

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


class UserDetailSerializer(ModelSerializerExtension):
    """
    A detailed serializer class for the CustomUser model.
    """

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


class LoginSerializer(serializers.Serializer):
    """
    A serializer class for login.
    """

    email = serializers.EmailField(required=True)
    password = serializers.CharField(style={"input_type": "password"})

    def authenticate(self, **kwargs):
        return authenticate(self.context["request"], **kwargs)

    def _validate_email(self, email, password):
        if email and password:
            user = self.authenticate(email=email, password=password)
            return user

        msg = _('Must include "email" and "password".')
        raise exceptions.ValidationError(msg)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

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

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass
