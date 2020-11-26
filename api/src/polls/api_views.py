from common.generics.generic_post_api_views import GenericPostListCreate
from common.abstract_api_views import AbstractModelViewSet, AbstractSavedView
from common.generics.generic_post_api_views import GenericUserExtension
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
    search_fields = [
        "title",
    ]


# HTTP GET: Returns a list of liked users who liked a poll
# HTTP POST: Like or unlike a poll
@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Polls"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Polls"]))
class PollLike(AbstractSavedView):
    query_string = "liked_poll_set"
    serializer_class = PollSerializer
    model_class = Poll


# HTTP GET: Returns a list of options for the poll with the ID that matches the ID in the URL
# HTTP POST: Creates an options for the poll with the ID that matches the ID in the URL
@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Polls"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Polls"]))
class OptionListCreate(GenericPostListCreate):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer
    filterset_class = OptionFilterSet
    detail_serializer_class = OptionSerializer


# HTTP GET: Returns a list of votes for the option with the ID that matches the ID in the URL
# HTTP POST: Creates a vote for the option with the ID that matches the ID in the URL
@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Polls"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Polls"]))
class VoteListCreate(GenericPostListCreate):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    filterset_class = VoteFilterSet
    detail_serializer_class = VoteSerializer


# HTTP GET: Returns a list of saved polls by the requesting user
# HTTP POST: Updates the list of saved polls by adding/removing a poll from the list
@method_decorator(name="list", decorator=swagger_auto_schema(tags=["Polls"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Polls"]))
class SavedPoll(AbstractSavedView):
    query_string = "saved_poll_set"
    serializer_class = PollSerializer
    model_class = Poll
