from django_filters import rest_framework as filters
from .models import Post


# A filter set class for the Post model
class PostFilterSet(filters.FilterSet):
    min_datetime_created = filters.DateTimeFilter(
        field_name="datetime_created", lookup_expr="gte"
    )
    max_datetime_created = filters.DateTimeFilter(
        field_name="datetime_created", lookup_expr="lte"
    )

    class Meta:
        model = Post
        fields = [
            "creator",
            "min_datetime_created",
            "max_datetime_created",
            "community",
        ]
