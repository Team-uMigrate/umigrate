from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy, \
    GenericCommentListCreate, GenericCommentRetrieveUpdateDestroy
from .models import Event, EventComment
from .serializers import EventSerializer, EventCommentSerializer


# HTTP GET: Returns a list of events
# HTTP POST: Creates an events
class EventListCreate(GenericPostListCreate):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


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
