from common.abstract_api_views import (
    AbstractModelViewSet,
    AbstractAddRemoveUser,
    AbstractLikedUsers,
)
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


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Events"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Events"]))
class LikedEvents(AbstractAddRemoveUser):
    query_string = "liked_events"
    serializer_class = EventSerializer
    model_class = Event


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Events"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Events"]))
class SavedEvents(AbstractAddRemoveUser):
    query_string = "saved_events"
    serializer_class = EventSerializer
    model_class = Event


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Events"]))
class EventLikes(AbstractLikedUsers):
    model_class = Event


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Events"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Events"]))
class InterestedEvents(AbstractAddRemoveUser):
    query_string = "interested_events"
    serializer_class = EventSerializer
    model_class = Event


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Events"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Events"]))
class InterestedEvents(AbstractAddRemoveUser):
    query_string = "attending_events"
    serializer_class = EventSerializer
    model_class = Event
