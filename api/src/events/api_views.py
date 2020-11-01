from common.abstract_api_views import AbstractModelViewSet
from common.generics.generic_post_api_views import GenericUserExtension
from .filters import EventFilterSet
from .models import Event
from .serializers import EventSerializer, EventDetailSerializer
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


@method_decorator(name="list", decorator=swagger_auto_schema(tags=["Events"]))
@method_decorator(name="create", decorator=swagger_auto_schema(tags=["Events"]))
@method_decorator(name="retrieve", decorator=swagger_auto_schema(tags=["Events"]))
@method_decorator(name="update", decorator=swagger_auto_schema(tags=["Events"]))
@method_decorator(name="partial_update", decorator=swagger_auto_schema(tags=["Events"]))
@method_decorator(name="destroy", decorator=swagger_auto_schema(tags=["Events"]))
class EventViewSet(AbstractModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    detail_serializer_class = EventDetailSerializer
    filterset_class = EventFilterSet
    search_fields = ["title", "location"]


# HTTP GET: Returns a list of liked users that liked an event
# HTTP POST: Like or unlike an event
@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Events"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Events"]))
class EventLike(GenericUserExtension):
    field_string = "like"

    @staticmethod
    def field_func(obj_id):
        return Event.objects.get(id=obj_id).liked_users


# HTTP GET: Returns a list of users that are interested in the event
# HTTP POST: Sets or removes a user's status to interested
@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Events"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Events"]))
class EventInterestedUser(GenericUserExtension):
    field_string = "interested"

    @staticmethod
    def field_func(obj_id):
        return Event.objects.get(id=obj_id).interested_users


# HTTP GET: Returns a list of users that are attending the event
# HTTP POST: Sets or removes a user's status to attending
@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Events"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Events"]))
class EventAttendingUser(GenericUserExtension):
    field_string = "attending"

    @staticmethod
    def field_func(obj_id):
        return Event.objects.get(id=obj_id).attending_users
