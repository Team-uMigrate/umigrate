from django_filters import rest_framework as filters
from .models import Listing, RoommatePost


class ListingFilter(filters.FilterSet):
    """
    A filter set class for the Listing model.
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
        model = Listing
        fields = [
            "creator",
            "min_datetime_created",
            "max_datetime_created",
            "community",
            "category",
            "min_price",
            "max_price",
            "season",
            "year",
            "quantity",
        ]
