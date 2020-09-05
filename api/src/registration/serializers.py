from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer


class RegistrationSerializer (RegisterSerializer):
    # Adds additional email checks for a valid email
    def validate_email(self, email):
        email = super().validate_email(email)
        if not str(email).endswith('@uwaterloo.ca'):
            raise serializers.ValidationError("Must be a uwaterloo.ca e-mail address.")
        return email

    # Verifies that the UWaterloo response is valid and non-empty
    def validate_uwResponse(self, uwResponse):
        if not uwResponse:
            raise serializers.ValidationError("Invalid uwaterloo.ca e-mail address.")
