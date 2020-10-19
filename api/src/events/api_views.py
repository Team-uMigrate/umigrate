from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy, \
 GenericUserExtension
from .models import Event
from .serializers import EventSerializer, EventDetailSerializer
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


# HTTP GET: Returns a list of liked users that liked an event
# HTTP POST: Like or unlike an event
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Events']))
class EventLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return Event.objects.get(id=obj_id).liked_users


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
