from django_filters import rest_framework as filters
from users.models import CustomUser


class UserFilterSet(filters.FilterSet):
    class Meta:
        model = CustomUser
        fields = [
            "email",
            "pronouns",
            "datetime_created",
            "birthday",
            "current_term",
            "enrolled_program",
            "region",
            "phone_number",
        ]
