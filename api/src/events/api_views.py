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
from common.decorators import (
    model_view_set_swagger_decorator,
    api_view_swagger_decorator,
)
from notifications.utils import create_event_reminder_notification
from datetime import datetime, timedelta
from umigrate import settings
from rq import Queue
from redis import Redis


@model_view_set_swagger_decorator(["Events"])
class EventViewSet(AbstractModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    detail_serializer_class = EventDetailSerializer
    filterset_class = EventFilterSet


@api_view_swagger_decorator(["Events"])
class LikedEvents(AbstractAddRemoveUser):
    query_string = "liked_events"
    serializer_class = EventSerializer
    model_class = Event


@api_view_swagger_decorator(["Events"])
class SavedEvents(AbstractAddRemoveUser):
    query_string = "saved_events"
    serializer_class = EventSerializer
    model_class = Event


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Events"]))
class EventLikes(AbstractLikedUsers):
    model_class = Event


@api_view_swagger_decorator(["Events"])
class InterestedEvents(AbstractAddRemoveUser):
    query_string = "interested_events"
    serializer_class = EventSerializer
    model_class = Event


@api_view_swagger_decorator(["Events"])
class AttendingEvents(AbstractAddRemoveUser):
    query_string = "attending_events"
    serializer_class = EventSerializer
    model_class = Event

    def post(self, request, *args, **kwargs):
        response = AbstractAddRemoveUser.post(self, request, args, kwargs)
        if response["should_add"] and request.user.event_reminder_preference:
            queue = Queue(name=settings.SCHEDULER_QUEUE, connection=Redis())
            event = Event.objects.get(request.id)
            job = queue.enqueue_at(
                event.start_datetime
                - timedelta(minutes=request.user.event_reminder_preference),
                create_event_reminder_notification,
                event,
                request.use,
            )

        return response
