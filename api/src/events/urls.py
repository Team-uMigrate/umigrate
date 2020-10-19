from django.urls import path
from .api_views import EventListCreate, EventRetrieveUpdateDestroy, EventLike, EventInterestedUser, EventAttendingUser

# Events url patterns
urlpatterns = [
    path('', EventListCreate.as_view()),
    path('<int:id>', EventRetrieveUpdateDestroy.as_view()),
    path('like', EventLike.as_view()),
    path('interested', EventInterestedUser.as_view()),
    path('attending', EventAttendingUser.as_view()),
]
