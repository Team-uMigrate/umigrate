from django.urls import path
from .api_views import EventListCreate, EventRetrieveUpdateDestroy, EventCommentListCreate, EventCommentRetrieveUpdateDestroy


# Events url patterns
urlpatterns = [
    path('events/', EventListCreate.as_view()),
    path('events/<int:id>', EventRetrieveUpdateDestroy.as_view()),
    path('events/<int:id>/comments/', EventCommentListCreate.as_view()),
    path('events/comments/<int:id>', EventCommentRetrieveUpdateDestroy.as_view()),
]
