from django.urls import path
from .api_views import EventListCreate, EventRetrieveUpdateDestroy, EventCommentListCreate, \
    EventCommentRetrieveUpdateDestroy, EventLike, EventCommentLike, EventInterestedUser, EventAttendingUser

# Events url patterns
urlpatterns = [
    path('events/', EventListCreate.as_view()),
    path('events/<int:id>', EventRetrieveUpdateDestroy.as_view()),
    path('events/<int:id>/comments/', EventCommentListCreate.as_view()),
    path('events/comments/<int:id>', EventCommentRetrieveUpdateDestroy.as_view()),
    path('events/<int:id>/like', EventLike.as_view()),
    path('events/comments/<int:id>/like', EventCommentLike.as_view()),
    path('events/<int:id>/interested', EventInterestedUser.as_view()),
    path('events/<int:id>/attending', EventAttendingUser.as_view()),
]
