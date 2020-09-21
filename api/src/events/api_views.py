from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy, \
    GenericCommentListCreate, GenericCommentRetrieveUpdateDestroy, GenericUserExtension
from .models import Event, EventComment
from .serializers import EventSerializer, EventCommentSerializer
from drf_yasg.utils import swagger_auto_schema


# HTTP GET: Returns a list of events
# HTTP POST: Creates an events
class EventListCreate(GenericPostListCreate):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_fields = ['region', 'datetime_created', 'creator', 'start_datetime', 'end_datetime', 'price_scale', ]
    search_fields = ['title', ]

    @swagger_auto_schema(tags=['Events'])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Events'])
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


# HTTP GET: Returns an event
# HTTP PUT: Updates an event
# HTTP PATCH: Partially updates an event
# HTTP DELETE: Deletes an event
class EventRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    @swagger_auto_schema(tags=['Events'])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Events'])
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Events'])
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Events'])
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)


# HTTP GET: Returns a list of event comments for the event with the ID that matches the ID in the URL
# HTTP POST: Creates a event comment for the event with the ID that matches the ID in the URL
class EventCommentListCreate(GenericCommentListCreate):
    queryset = EventComment.objects.all()
    serializer_class = EventCommentSerializer
    parent_string = 'event'

    @swagger_auto_schema(tags=['Events'])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Events'])
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


# HTTP GET: Returns an event comment
# HTTP PUT: Updates an event comment
# HTTP PATCH: Partially updates an event comment
# HTTP DELETE: Deletes an event comment
class EventCommentRetrieveUpdateDestroy(GenericCommentRetrieveUpdateDestroy):
    queryset = EventComment.objects.all()
    serializer_class = EventCommentSerializer
    parent_string = 'event'

    @swagger_auto_schema(tags=['Events'])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Events'])
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Events'])
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Events'])
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)


# HTTP POST: Like or unlike an event
class EventLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return Event.objects.get(id=obj_id).liked_users

    @swagger_auto_schema(tags=['Events'])
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


# HTTP POST: Like or unlike an event comment
class EventCommentLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return EventComment.objects.get(id=obj_id).liked_users

    @swagger_auto_schema(tags=['Events'])
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


# HTTP POST: Sets or removes a user's status to interested
class EventInterestedUser(GenericUserExtension):
    field_string = 'interested'

    @staticmethod
    def field_func(obj_id):
        return Event.objects.get(id=obj_id).interested_users

    @swagger_auto_schema(tags=['Events'])
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


# HTTP POST: Sets or removes a user's status to attending
class EventAttendingUser(GenericUserExtension):
    field_string = 'attending'

    @staticmethod
    def field_func(obj_id):
        return Event.objects.get(id=obj_id).attending_users

    @swagger_auto_schema(tags=['Events'])
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
