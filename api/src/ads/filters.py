from django_filters import rest_framework as filters
from .models import Ad


class AdFilterSet(filters.FilterSet):
    """
    A filter set class for the Ad model.
    """

    min_datetime_created = filters.DateTimeFilter(
        field_name="datetime_created", lookup_expr="gte"
    )
    max_datetime_created = filters.DateTimeFilter(
        field_name="datetime_created", lookup_expr="lte"
    )
    min_price = filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = filters.NumberFilter(field_name="price", lookup_expr="lte")

    class Meta:
        model = Ad
        fields = [
            "creator",
            "min_datetime_created",
            "max_datetime_created",
            "community",
            "is_service",
            "is_buying",
            "category",
            "postal_code",
            "min_price",
            "max_price",
            "quantity",
        ]
