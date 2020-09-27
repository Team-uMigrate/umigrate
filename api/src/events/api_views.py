from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy, \
 GenericUserExtension
from .models import Event, EventComment
from .serializers import EventSerializer, EventCommentSerializer


# HTTP GET: Returns a list of events
# HTTP POST: Creates an events
class EventListCreate(GenericPostListCreate):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_fields = ['region', 'datetime_created', 'creator', 'start_datetime', 'end_datetime', 'price',
                     'street_address', 'city', 'division', 'country', ]
    search_fields = ['title', 'city', 'division', 'country', ]


# HTTP GET: Returns an event
# HTTP PUT: Updates an event
# HTTP PATCH: Partially updates an event
# HTTP DELETE: Deletes an event
class EventRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


# HTTP GET: Returns a list of event comments for the event with the ID that matches the ID in the URL
# HTTP POST: Creates a event comment for the event with the ID that matches the ID in the URL
class EventCommentListCreate(GenericPostListCreate):
    queryset = EventComment.objects.all()
    serializer_class = EventCommentSerializer
    filter_fields = ['event', ]


# HTTP GET: Returns an event comment
# HTTP PUT: Updates an event comment
# HTTP PATCH: Partially updates an event comment
# HTTP DELETE: Deletes an event comment
class EventCommentRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = EventComment.objects.all()
    serializer_class = EventCommentSerializer


# HTTP GET: Returns true or false if a user has liked an event
# HTTP POST: Like or unlike an event
class EventLike(GenericUserExtension):
    response_string = 'liked'

    @staticmethod
    def field_func(obj_id):
        return Event.objects.get(id=obj_id).liked_users


# HTTP GET: Returns true or false if a user has liked an event comment
# HTTP POST: Like or unlike an event comment
class EventCommentLike(GenericUserExtension):
    response_string = 'liked'

    @staticmethod
    def field_func(obj_id):
        return EventComment.objects.get(id=obj_id).liked_users


# HTTP GET: Returns true or false if a user is interested in going to an event
# HTTP POST: Sets or removes a user's status to interested
class EventInterestedUser(GenericUserExtension):
    response_string = 'interested'

    @staticmethod
    def field_func(obj_id):
        return Event.objects.get(id=obj_id).interested_users


# HTTP GET: Returns true or false if a user is attending an event
# HTTP POST: Sets or removes a user's status to attending
class EventAttendingUser(GenericUserExtension):
    response_string = 'attending'

    @staticmethod
    def field_func(obj_id):
        return Event.objects.get(id=obj_id).attending_users
