from django_filters import rest_framework as filters
from .models import Poll, Option, Vote


# A filter set class for the Poll model
class PollFilterSet(filters.FilterSet):
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


# A filter set class for the Option model
class OptionFilterSet(filters.FilterSet):
    class Meta:
        model = Option
        fields = [
            "poll",
        ]


# A filter set class for the Vote model
class VoteFilterSet(filters.FilterSet):
    class Meta:
        model = Vote
        fields = [
            "option",
        ]
