from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from common.abstract_api_views import (
    AbstractModelViewSet,
    AbstractSavedView,
    AbstractLikedUsers,
)
from .models import Comment, Reply
from .serializers import (
    CommentSerializer,
    CommentDetailSerializer,
    ReplySerializer,
    ReplyDetailSerializer,
)
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


@method_decorator(name="list", decorator=swagger_auto_schema(tags=["Comments"]))
@method_decorator(name="create", decorator=swagger_auto_schema(tags=["Comments"]))
@method_decorator(name="retrieve", decorator=swagger_auto_schema(tags=["Comments"]))
@method_decorator(name="update", decorator=swagger_auto_schema(tags=["Comments"]))
@method_decorator(
    name="partial_update", decorator=swagger_auto_schema(tags=["Comments"])
)
@method_decorator(name="destroy", decorator=swagger_auto_schema(tags=["Comments"]))
class CommentViewSet(AbstractModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    detail_serializer_class = CommentDetailSerializer
    """Todo The default filter_backend (when nothing is specified) is DjangoFilterBackend. However, since we are 
    overriding this we must specify DjangoFilterBackend in addition to OrderingFilter, which is what are using to sort
    the results by date"""
    filter_backends = [OrderingFilter, DjangoFilterBackend]
    filter_fields = [
        "datetime_created",
        "creator",
        "object_id",
        "content_type",
    ]
    ordering_fields = ["datetime_created"]
    search_fields = [
        "content",
    ]


@method_decorator(name="list", decorator=swagger_auto_schema(tags=["Comments"]))
@method_decorator(name="create", decorator=swagger_auto_schema(tags=["Comments"]))
@method_decorator(name="retrieve", decorator=swagger_auto_schema(tags=["Comments"]))
@method_decorator(name="update", decorator=swagger_auto_schema(tags=["Comments"]))
@method_decorator(
    name="partial_update", decorator=swagger_auto_schema(tags=["Comments"])
)
@method_decorator(name="destroy", decorator=swagger_auto_schema(tags=["Comments"]))
class ReplyViewSet(AbstractModelViewSet):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer
    detail_serializer_class = ReplyDetailSerializer
    filter_backends = [OrderingFilter, DjangoFilterBackend]
    filter_fields = ["datetime_created", "creator", "comment"]
    ordering_fields = ["datetime_created"]
    search_fields = [
        "content",
    ]


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Comments"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Comments"]))
class LikedComments(AbstractSavedView):
    query_string = "liked_comments"
    serializer_class = CommentSerializer
    model_class = Comment


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Comments"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Comments"]))
class LikedReplies(AbstractSavedView):
    query_string = "liked_replies"
    serializer_class = ReplySerializer
    model_class = Reply


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Comments"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Comments"]))
class SavedComments(AbstractSavedView):
    query_string = "saved_comments"
    serializer_class = CommentSerializer
    model_class = Comment


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Comments"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Comments"]))
class SavedReplies(AbstractSavedView):
    query_string = "saved_replies"
    serializer_class = ReplySerializer
    model_class = Reply


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Comments"]))
class CommentLikes(AbstractLikedUsers):
    model_class = Comment


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Comments"]))
class ReplyLikes(AbstractLikedUsers):
    model_class = Reply
