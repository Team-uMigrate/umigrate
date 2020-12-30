from common.generics.generic_post_api_views import GenericPostListCreate
from common.abstract_api_views import (
    AbstractModelViewSet,
    AbstractAddRemoveUser,
    AbstractLikedUsers,
)
from .filters import PollFilterSet, OptionFilterSet, VoteFilterSet
from .models import Poll, Option, Vote
from .serializers import (
    PollSerializer,
    PollDetailSerializer,
    OptionSerializer,
    VoteSerializer,
)
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


@method_decorator(name="list", decorator=swagger_auto_schema(tags=["Polls"]))
@method_decorator(name="create", decorator=swagger_auto_schema(tags=["Polls"]))
@method_decorator(name="retrieve", decorator=swagger_auto_schema(tags=["Polls"]))
@method_decorator(name="update", decorator=swagger_auto_schema(tags=["Polls"]))
@method_decorator(name="partial_update", decorator=swagger_auto_schema(tags=["Polls"]))
@method_decorator(name="destroy", decorator=swagger_auto_schema(tags=["Polls"]))
class PollViewSet(AbstractModelViewSet):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
    detail_serializer_class = PollDetailSerializer
    filterset_class = PollFilterSet


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Polls"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Polls"]))
class LikedPolls(AbstractAddRemoveUser):
    query_string = "liked_polls"
    serializer_class = PollSerializer
    model_class = Poll


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Polls"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Polls"]))
class SavedPolls(AbstractAddRemoveUser):
    query_string = "saved_polls"
    serializer_class = PollSerializer
    model_class = Poll


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Polls"]))
class PollLikes(AbstractLikedUsers):
    model_class = Poll


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Polls"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Polls"]))
class OptionListCreate(GenericPostListCreate):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer
    filterset_class = OptionFilterSet
    detail_serializer_class = OptionSerializer


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Polls"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Polls"]))
class VoteListCreate(GenericPostListCreate):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    filterset_class = VoteFilterSet
    detail_serializer_class = VoteSerializer
