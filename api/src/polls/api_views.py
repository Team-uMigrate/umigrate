from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy, \
    GenericCommentListCreate, GenericCommentRetrieveUpdateDestroy, GenericUserExtension
from .models import Poll, PollComment, Option, Vote
from .serializers import PollSerializer, PollCommentSerializer, OptionSerializer, VoteSerializer
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


# HTTP GET: Returns a list of polls
# HTTP POST: Creates a polls
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Polls']))
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Polls']))
class PollListCreate(GenericPostListCreate):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
    filter_fields = ['region', 'datetime_created', 'creator', ]
    search_fields = ['title', ]


# HTTP GET: Returns a poll
# HTTP PUT: Updates a poll
# HTTP PATCH: Partially updates a poll
# HTTP DELETE: Deletes a poll
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Polls']))
@method_decorator(name='put', decorator=swagger_auto_schema(tags=['Polls']))
@method_decorator(name='patch', decorator=swagger_auto_schema(tags=['Polls']))
@method_decorator(name='delete', decorator=swagger_auto_schema(tags=['Polls']))
class PollRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer


# HTTP GET: Returns a list of poll comments for the poll with the ID that matches the ID in the URL
# HTTP POST: Creates a poll comment for the poll with the ID that matches the ID in the URL
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Polls']))
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Polls']))
class PollCommentListCreate(GenericCommentListCreate):
    queryset = PollComment.objects.all()
    serializer_class = PollCommentSerializer
    parent_string = 'poll'


# HTTP GET: Returns a poll comment
# HTTP PUT: Updates a poll comment
# HTTP PATCH: Partially updates a poll comment
# HTTP DELETE: Deletes a poll comment
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Polls']))
@method_decorator(name='put', decorator=swagger_auto_schema(tags=['Polls']))
@method_decorator(name='patch', decorator=swagger_auto_schema(tags=['Polls']))
@method_decorator(name='delete', decorator=swagger_auto_schema(tags=['Polls']))
class PollCommentRetrieveUpdateDestroy(GenericCommentRetrieveUpdateDestroy):
    queryset = PollComment.objects.all()
    serializer_class = PollCommentSerializer
    parent_string = 'poll'


# HTTP POST: Like or unlike a poll
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Polls']))
class PollLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return Poll.objects.get(id=obj_id).liked_users


# HTTP POST: Like or unlike a poll comment
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Polls']))
class PollCommentLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return PollComment.objects.get(id=obj_id).liked_users


# HTTP GET: Returns a list of options for the poll with the ID that matches the ID in the URL
# HTTP POST: Creates an options for the poll with the ID that matches the ID in the URL
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Polls']))
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Polls']))
class OptionListCreate(GenericCommentListCreate):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer
    parent_string = 'poll'


# HTTP GET: Returns a list of votes for the option with the ID that matches the ID in the URL
# HTTP POST: Creates a vote for the option with the ID that matches the ID in the URL
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Polls']))
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Polls']))
class VoteListCreate(GenericCommentListCreate):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    parent_string = 'option'
