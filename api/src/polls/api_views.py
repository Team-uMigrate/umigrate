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
from common.decorators import (
    model_view_set_swagger_decorator,
    api_view_swagger_decorator,
)


@model_view_set_swagger_decorator(["Polls"])
class PollViewSet(AbstractModelViewSet):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
    detail_serializer_class = PollDetailSerializer
    filterset_class = PollFilterSet


@api_view_swagger_decorator(["Polls"])
class LikedPolls(AbstractAddRemoveUser):
    query_string = "liked_polls"
    serializer_class = PollSerializer
    model_class = Poll


@api_view_swagger_decorator(["Polls"])
class SavedPolls(AbstractAddRemoveUser):
    query_string = "saved_polls"
    serializer_class = PollSerializer
    model_class = Poll


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Polls"]))
class PollLikes(AbstractLikedUsers):
    model_class = Poll


@api_view_swagger_decorator(["Polls"])
class OptionListCreate(GenericPostListCreate):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer
    filterset_class = OptionFilterSet
    detail_serializer_class = OptionSerializer


@api_view_swagger_decorator(["Polls"])
class VoteListCreate(GenericPostListCreate):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    filterset_class = VoteFilterSet
    detail_serializer_class = VoteSerializer
