from django_filters import rest_framework as filters
from .models import Event


# A filter set class for the Event model
class EventFilterSet(filters.FilterSet):
    min_datetime_created = filters.DateTimeFilter(
        field_name="datetime_created", lookup_expr="gte"
    )
    max_datetime_created = filters.DateTimeFilter(
        field_name="datetime_created", lookup_expr="lte"
    )
    min_start_datetime = filters.DateTimeFilter(
        field_name="start_datetime", lookup_expr="gte"
    )
    max_start_datetime = filters.DateTimeFilter(
        field_name="start_datetime", lookup_expr="lte"
    )
    min_end_datetime = filters.DateTimeFilter(
        field_name="end_datetime", lookup_expr="gte"
    )
    max_end_datetime = filters.DateTimeFilter(
        field_name="end_datetime", lookup_expr="lte"
    )
    min_price = filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = filters.NumberFilter(field_name="price", lookup_expr="lte")

    class Meta:
        model = Event
        fields = [
            "creator",
            "min_datetime_created",
            "max_datetime_created",
            "community",
            "min_start_datetime",
            "max_start_datetime",
            "min_end_datetime",
            "max_end_datetime",
            "min_price",
            "max_price",
            "price_scale",
        ]
