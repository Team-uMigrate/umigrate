from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy, \
    GenericUserExtension
from .models import Poll, PollComment, Option, Vote
from .serializers import PollSerializer, PollCommentSerializer, OptionSerializer, VoteSerializer


# HTTP GET: Returns a list of polls
# HTTP POST: Creates a polls
class PollListCreate(GenericPostListCreate):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
    filter_fields = ['region', 'datetime_created', 'creator', ]
    search_fields = ['title', ]


# HTTP GET: Returns a poll
# HTTP PUT: Updates a poll
# HTTP PATCH: Partially updates a poll
# HTTP DELETE: Deletes a poll
class PollRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer


# HTTP GET: Returns a list of poll comments for the poll with the ID that matches the ID in the URL
# HTTP POST: Creates a poll comment for the poll with the ID that matches the ID in the URL
class PollCommentListCreate(GenericPostListCreate):
    queryset = PollComment.objects.all()
    serializer_class = PollCommentSerializer
    filter_fields = ['poll', ]


# HTTP GET: Returns a poll comment
# HTTP PUT: Updates a poll comment
# HTTP PATCH: Partially updates a poll comment
# HTTP DELETE: Deletes a poll comment
class PollCommentRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = PollComment.objects.all()
    serializer_class = PollCommentSerializer


# HTTP GET: Returns true or false if a user has liked a poll
# HTTP POST: Like or unlike a poll
class PollLike(GenericUserExtension):
    response_string = 'liked'

    @staticmethod
    def field_func(obj_id):
        return Poll.objects.get(id=obj_id).liked_users


# HTTP GET: Returns true or false if a user has liked a poll comment
# HTTP POST: Like or unlike a poll comment
class PollCommentLike(GenericUserExtension):
    response_string = 'liked'

    @staticmethod
    def field_func(obj_id):
        return PollComment.objects.get(id=obj_id).liked_users


# HTTP GET: Returns a list of options for the poll with the ID that matches the ID in the URL
# HTTP POST: Creates an options for the poll with the ID that matches the ID in the URL
class OptionListCreate(GenericPostListCreate):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer
    filter_fields = ['poll', ]


# HTTP GET: Returns a list of votes for the option with the ID that matches the ID in the URL
# HTTP POST: Creates a vote for the option with the ID that matches the ID in the URL
class VoteListCreate(GenericPostListCreate):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    filter_fields = ['option', ]
