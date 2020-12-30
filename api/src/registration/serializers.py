from rest_framework import serializers
from rest_auth.registration.serializers import (
    get_adapter,
    setup_user_email,
    email_address_exists,
)
from django.utils.translation import ugettext_lazy as _


# A serializer class for registration
class RegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(write_only=True, style={"input_type": "password"})
    password2 = serializers.CharField(write_only=True, style={"input_type": "password"})

    # Adds additional email checks for a valid email
    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if email and email_address_exists(email):
            raise serializers.ValidationError(
                _("A user is already registered with this e-mail address.")
            )
        if not str(email).endswith("@uwaterloo.ca"):
            raise serializers.ValidationError("Must be a uwaterloo.ca e-mail address.")
        return email

    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    # Verifies that the UWaterloo response is valid and non-empty
    def validate_uwResponse(self, uwResponse):
        if not uwResponse:
            raise serializers.ValidationError("Invalid uwaterloo.ca e-mail address.")

    def validate(self, data):
        if data["password1"] != data["password2"]:
            raise serializers.ValidationError(
                _("The two password fields didn't match.")
            )
        return data

    def custom_signup(self, request, user):
        pass

    def get_cleaned_data(self):
        return {
            "password1": self.validated_data.get("password1", ""),
            "email": self.validated_data.get("email", ""),
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        self.custom_signup(request, user)
        setup_user_email(request, user, [])
        return user
