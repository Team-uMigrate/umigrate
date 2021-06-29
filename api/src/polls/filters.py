from django_filters import rest_framework as filters
from .models import Poll, Option, Vote


class PollFilterSet(filters.FilterSet):
    """
    A filter set class for the Poll model.
    """

    min_datetime_created = filters.DateTimeFilter(
        field_name="datetime_created", lookup_expr="gte"
    )
    max_datetime_created = filters.DateTimeFilter(
        field_name="datetime_created", lookup_expr="lte"
    )

    class Meta:
        model = Poll
        fields = [
            "creator",
            "min_datetime_created",
            "max_datetime_created",
            "community",
            "is_multiselect",
            "is_public",
        ]


class OptionFilterSet(filters.FilterSet):
    """
    A filter set class for the Option model.
    """

    class Meta:
        model = Option
        fields = [
            "poll",
        ]


class VoteFilterSet(filters.FilterSet):
    """
    A filter set class for the Vote model.
    """

    class Meta:
        model = Vote
        fields = [
            "option",
        ]
