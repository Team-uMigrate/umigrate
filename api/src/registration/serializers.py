from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer

class RegistrationSerializer (RegisterSerializer):
    def validate_email(self, email):
        email = super().validate_email(email)
        if not str(email).endswith('@uwaterloo.ca'):
            print("Oh my! No waterloo email no service!!")
            raise serializers.ValidationError("Must be a uwaterloo.ca e-mail address.")
        return email
        