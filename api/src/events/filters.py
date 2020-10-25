from django_filters import rest_framework as filters
from .models import Event


class EventFilterSet(filters.FilterSet):
    class Meta:
        model = Event
        fields = [
            "region",
            "datetime_created",
            "creator",
            "start_datetime",
            "end_datetime",
            "price_scale",
        ]
