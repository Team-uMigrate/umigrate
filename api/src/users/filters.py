from django_filters import rest_framework as filters
from users.models import CustomUser


# A filter set class for the User model
class UserFilterSet(filters.FilterSet):
    min_datetime_created = filters.DateTimeFilter(
        field_name="datetime_created", lookup_expr="gte"
    )
    max_datetime_created = filters.DateTimeFilter(
        field_name="datetime_created", lookup_expr="lte"
    )

    class Meta:
        model = CustomUser
        fields = [
            "email",
            "min_datetime_created",
            "max_datetime_created",
            "community",
            "pronouns",
            "current_term",
            "enrolled_program",
        ]
