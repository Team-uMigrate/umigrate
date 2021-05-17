from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from common.abstract_api_views import (
    AbstractModelViewSet,
    AbstractAddRemoveUser,
    AbstractLikedUsers,
)
from .filters import CommentFilterSet, ReplyFilterSet
from .models import Comment, Reply
from .serializers import (
    CommentSerializer,
    CommentDetailSerializer,
    ReplySerializer,
    ReplyDetailSerializer,
)
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from common.decorators_api_views import viewsets


@viewsets('Comments')
class CommentViewSet(AbstractModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    detail_serializer_class = CommentDetailSerializer
    filter_backends = [OrderingFilter, DjangoFilterBackend]
    filterset_class = CommentFilterSet
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
    filterset_class = ReplyFilterSet
    ordering_fields = ["datetime_created"]
    search_fields = [
        "content",
    ]


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Comments"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Comments"]))
class LikedComments(AbstractAddRemoveUser):
    query_string = "liked_comments"
    serializer_class = CommentSerializer
    model_class = Comment


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Comments"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Comments"]))
class LikedReplies(AbstractAddRemoveUser):
    query_string = "liked_replies"
    serializer_class = ReplySerializer
    model_class = Reply


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Comments"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Comments"]))
class SavedComments(AbstractAddRemoveUser):
    query_string = "saved_comments"
    serializer_class = CommentSerializer
    model_class = Comment


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Comments"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Comments"]))
class SavedReplies(AbstractAddRemoveUser):
    query_string = "saved_replies"
    serializer_class = ReplySerializer
    model_class = Reply


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Comments"]))
class CommentLikes(AbstractLikedUsers):
    model_class = Comment


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Comments"]))
class ReplyLikes(AbstractLikedUsers):
    model_class = Reply
