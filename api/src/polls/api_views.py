from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy, \
    GenericUserExtension
from .models import Poll, PollComment, Option, Vote
from .serializers import PollSerializer, PollCommentSerializer, OptionSerializer, VoteSerializer, PollDetailSerializer, \
    PollCommentDetailSerializer
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


# HTTP GET: Returns a list of polls
# HTTP POST: Creates a polls
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Polls']))
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Polls']))
class PollListCreate(GenericPostListCreate):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
    detail_serializer_class = PollDetailSerializer
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
    detail_serializer_class = PollDetailSerializer


# HTTP GET: Returns a list of poll comments for the poll with the ID that matches the ID in the URL
# HTTP POST: Creates a poll comment for the poll with the ID that matches the ID in the URL
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Polls']))
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Polls']))
class PollCommentListCreate(GenericPostListCreate):
    queryset = PollComment.objects.all()
    serializer_class = PollCommentSerializer
    filter_fields = ['poll', ]
    detail_serializer_class = PollCommentDetailSerializer


# HTTP GET: Returns a poll comment
# HTTP PUT: Updates a poll comment
# HTTP PATCH: Partially updates a poll comment
# HTTP DELETE: Deletes a poll comment
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Polls']))
@method_decorator(name='put', decorator=swagger_auto_schema(tags=['Polls']))
@method_decorator(name='patch', decorator=swagger_auto_schema(tags=['Polls']))
@method_decorator(name='delete', decorator=swagger_auto_schema(tags=['Polls']))
class PollCommentRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = PollComment.objects.all()
    serializer_class = PollCommentSerializer
    detail_serializer_class = PollCommentDetailSerializer

    
# HTTP GET: Returns a list of liked users who liked a poll
# HTTP POST: Like or unlike a poll
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Polls']))
class PollLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return Poll.objects.get(id=obj_id).liked_users

    
# HTTP GET: Returns a list of liked users who liked a poll comment
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
class OptionListCreate(GenericPostListCreate):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer
    filter_fields = ['poll', ]
    detail_serializer_class = OptionSerializer


# HTTP GET: Returns a list of votes for the option with the ID that matches the ID in the URL
# HTTP POST: Creates a vote for the option with the ID that matches the ID in the URL
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Polls']))
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Polls']))
class VoteListCreate(GenericPostListCreate):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    filter_fields = ['option', ]
    detail_serializer_class = VoteSerializer
