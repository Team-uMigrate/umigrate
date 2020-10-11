from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy, \
 GenericUserExtension
from .models import Event, EventComment
from .serializers import EventSerializer, EventCommentSerializer, EventDetailSerializer, EventCommentDetailSerializer
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


# HTTP GET: Returns a list of events
# HTTP POST: Creates an events
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Events']))
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Events']))
class EventListCreate(GenericPostListCreate):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    detail_serializer_class = EventDetailSerializer
    filter_fields = ['region', 'datetime_created', 'creator', 'start_datetime', 'end_datetime', 'price_scale', ]
    search_fields = ['title', 'location']


# HTTP GET: Returns an event
# HTTP PUT: Updates an event
# HTTP PATCH: Partially updates an event
# HTTP DELETE: Deletes an event
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Events']))
@method_decorator(name='put', decorator=swagger_auto_schema(tags=['Events']))
@method_decorator(name='patch', decorator=swagger_auto_schema(tags=['Events']))
@method_decorator(name='delete', decorator=swagger_auto_schema(tags=['Events']))
class EventRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    detail_serializer_class = EventDetailSerializer


# HTTP GET: Returns a list of event comments for the event with the ID that matches the ID in the URL
# HTTP POST: Creates a event comment for the event with the ID that matches the ID in the URL
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Events']))
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Events']))
class EventCommentListCreate(GenericPostListCreate):
    queryset = EventComment.objects.all()
    serializer_class = EventCommentSerializer
    filter_fields = ['event', ]
    detail_serializer_class = EventCommentDetailSerializer


# HTTP GET: Returns an event comment
# HTTP PUT: Updates an event comment
# HTTP PATCH: Partially updates an event comment
# HTTP DELETE: Deletes an event comment
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Events']))
@method_decorator(name='put', decorator=swagger_auto_schema(tags=['Events']))
@method_decorator(name='patch', decorator=swagger_auto_schema(tags=['Events']))
@method_decorator(name='delete', decorator=swagger_auto_schema(tags=['Events']))
class EventCommentRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = EventComment.objects.all()
    serializer_class = EventCommentSerializer
    detail_serializer_class = EventCommentDetailSerializer


# HTTP GET: Returns a list of liked users that liked an event
# HTTP POST: Like or unlike an event
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Events']))
class EventLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return Event.objects.get(id=obj_id).liked_users

# HTTP GET: Returns a list of liked users that liked an event comment
# HTTP POST: Like or unlike an event comment
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Events']))
class EventCommentLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return EventComment.objects.get(id=obj_id).liked_users


# HTTP POST: Sets or removes a user's status to interested
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Events']))
class EventInterestedUser(GenericUserExtension):
    field_string = 'interested'

    @staticmethod
    def field_func(obj_id):
        return Event.objects.get(id=obj_id).interested_users


# HTTP POST: Sets or removes a user's status to attending
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Events']))
class EventAttendingUser(GenericUserExtension):
    field_string = 'attending'

    @staticmethod
    def field_func(obj_id):
        return Event.objects.get(id=obj_id).attending_users
