from common.abstract_api_views import (
    AbstractModelViewSet,
    AbstractSavedView,
    AbstractLikedUsers,
)
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
class EventLike(AbstractSavedView):
    query_string = "liked_events"
    serializer_class = EventSerializer
    model_class = Event


# HTTP GET: Returns a list of liked users that liked an event
@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Events"]))
class EventLikes(AbstractLikedUsers):
    model_class = Event


# HTTP GET: Returns a list of users that are interested in the event
# HTTP POST: Sets or removes a user's status to interested
@method_decorator(name="list", decorator=swagger_auto_schema(tags=["Events"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Events"]))
class EventInterestedUser(AbstractSavedView):
    query_string = "interested_events"
    serializer_class = EventSerializer
    model_class = Event


# HTTP GET: Returns a list of users that are attending the event
# HTTP POST: Sets or removes a user's status to attending
@method_decorator(name="list", decorator=swagger_auto_schema(tags=["Events"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Events"]))
class EventAttendingUser(AbstractSavedView):
    query_string = "attending_events"
    serializer_class = EventSerializer
    model_class = Event


@method_decorator(name="list", decorator=swagger_auto_schema(tags=["Events"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Events"]))
class SavedEvent(AbstractSavedView):
    query_string = "saved_events"
    serializer_class = EventSerializer
    model_class = Event
