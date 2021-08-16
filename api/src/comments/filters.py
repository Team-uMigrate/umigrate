from django_filters import rest_framework as filters
from .models import Comment, Reply


class CommentFilterSet(filters.FilterSet):
    """
    A filter set class for the Comment model.
    """

    min_datetime_created = filters.DateTimeFilter(
        field_name="datetime_created", lookup_expr="gte"
    )
    max_datetime_created = filters.DateTimeFilter(
        field_name="datetime_created", lookup_expr="lte"
    )

    class Meta:
        model = Comment
        fields = [
            "creator",
            "min_datetime_created",
            "max_datetime_created",
            "content_type",
            "object_id",
        ]


class ReplyFilterSet(filters.FilterSet):
    """
    A filter set class for the Reply model.
    """

    min_datetime_created = filters.DateTimeFilter(
        field_name="datetime_created", lookup_expr="gte"
    )
    max_datetime_created = filters.DateTimeFilter(
        field_name="datetime_created", lookup_expr="lte"
    )

    class Meta:
        model = Reply
        fields = [
            "creator",
            "min_datetime_created",
            "max_datetime_created",
            "comment",
        ]
