from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy, \
    GenericCommentListCreate, GenericCommentRetrieveUpdateDestroy, GenericUserExtension
from .models import Event, EventComment
from .serializers import EventSerializer, EventCommentSerializer


# HTTP GET: Returns a list of events
# HTTP POST: Creates an events
class EventListCreate(GenericPostListCreate):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_fields = ['region', 'datetime_created', 'creator', 'start_datetime', 'end_datetime', 'price_scale', ]
    search_fields = ['title', ]


# HTTP GET: Returns an event
# HTTP PUT: Updates an event
# HTTP PATCH: Partially updates an event
# HTTP DELETE: Deletes an event
class EventRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


# HTTP GET: Returns a list of event comments for the event with the ID that matches the ID in the URL
# HTTP POST: Creates a event comment for the event with the ID that matches the ID in the URL
class EventCommentListCreate(GenericCommentListCreate):
    queryset = EventComment.objects.all()
    serializer_class = EventCommentSerializer
    parent_string = 'event'


# HTTP GET: Returns an event comment
# HTTP PUT: Updates an event comment
# HTTP PATCH: Partially updates an event comment
# HTTP DELETE: Deletes an event comment
class EventCommentRetrieveUpdateDestroy(GenericCommentRetrieveUpdateDestroy):
    queryset = EventComment.objects.all()
    serializer_class = EventCommentSerializer
    parent_string = 'event'


# HTTP POST: Like or unlike an event
class EventLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return Event.objects.get(id=obj_id).liked_users


# HTTP POST: Like or unlike an event comment
class EventCommentLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return EventComment.objects.get(id=obj_id).liked_users


# HTTP POST: Sets or removes a user's status to interested
class EventInterestedUser(GenericUserExtension):
    field_string = 'interested'

    @staticmethod
    def field_func(obj_id):
        return Event.objects.get(id=obj_id).interested_users


# HTTP POST: Sets or removes a user's status to attending
class EventAttendingUser(GenericUserExtension):
    field_string = 'attending'

    @staticmethod
    def field_func(obj_id):
        return Event.objects.get(id=obj_id).attending_users
