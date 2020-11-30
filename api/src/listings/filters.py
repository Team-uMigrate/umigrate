from django_filters import rest_framework as filters
from .models import Listing


class ListingFilter(filters.FilterSet):
    # More on lookup_expr syntax: https://django-filter.readthedocs.io/en/latest/ref/filters.html
    # https://docs.djangoproject.com/en/3.0/ref/models/querysets/#field-lookups
    # gte = greater than or equal to
    # lte = less than or equal to

    min_price = filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = filters.NumberFilter(field_name="price", lookup_expr="lte")
    min_date = filters.DateTimeFilter(field_name="datetime_created", lookup_expr="gte")
    max_date = filters.DateTimeFilter(field_name="datetime_created", lookup_expr="lte")
    location = filters.CharFilter(field_name="location", lookup_expr="icontains")

    class Meta:
        model = Listing
        fields = [
            "min_price",
            "max_price",
            "min_date",
            "max_date",
            "datetime_created",
            "creator",
            "category",
            "price",
            "title",
            "location",
        ]
