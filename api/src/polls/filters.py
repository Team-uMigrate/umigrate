from django_filters import rest_framework as filters
from .models import Poll, Option, Vote


class PollFilterSet(filters.FilterSet):
    class Meta:
        model = Poll
        fields = [
            "region",
            "datetime_created",
            "creator",
        ]


class OptionFilterSet(filters.FilterSet):
    class Meta:
        model = Option
        fields = [
            "poll",
        ]


class VoteFilterSet(filters.FilterSet):
    class Meta:
        model = Vote
        fields = [
            "option",
        ]
