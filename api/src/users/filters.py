from django_filters import rest_framework as filters
from users.models import CustomUser


class UserFilterSet(filters.FilterSet):
    """
    A filter set class for the User model.
    """

    min_datetime_created = filters.DateTimeFilter(
        field_name="datetime_created", lookup_expr="gte"
    )
    max_datetime_created = filters.DateTimeFilter(
        field_name="datetime_created", lookup_expr="lte"
    )

    class Meta:
        model = CustomUser
        fields = [
            "min_datetime_created",
            "max_datetime_created",
            "community",
            "pronouns",
            "current_term",
            "enrolled_program",
        ]
