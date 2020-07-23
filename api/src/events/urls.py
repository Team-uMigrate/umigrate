from django.urls import path
from .api_views import EventListCreate, EventRetrieveUpdateDestroy, EventCommentListCreate, \
    EventCommentRetrieveUpdateDestroy, EventLike, EventCommentLike, EventInterestedUser, EventAttendingUser

# Events url patterns
urlpatterns = [
    path('', EventListCreate.as_view()),
    path('<int:id>', EventRetrieveUpdateDestroy.as_view()),
    path('<int:id>/comments/', EventCommentListCreate.as_view()),
    path('comments/<int:id>', EventCommentRetrieveUpdateDestroy.as_view()),
    path('<int:id>/like', EventLike.as_view()),
    path('comments/<int:id>/like', EventCommentLike.as_view()),
    path('<int:id>/interested', EventInterestedUser.as_view()),
    path('<int:id>/attending', EventAttendingUser.as_view()),
]
