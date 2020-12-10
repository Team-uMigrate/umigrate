from django.urls import path
from rest_framework.routers import DefaultRouter
from .api_views import (
    EventViewSet,
    LikedEvent,
    SavedEvent,
    EventLikes,
    EventInterestedUser,
    EventAttendingUser,
)

# Events url patterns
router = DefaultRouter(trailing_slash=False)
router.register(r"", EventViewSet, basename="events")
urlpatterns = router.urls + [
    path("liked", LikedEvent.as_view()),
    path("<int:id>/likes", EventLikes.as_view()),
    path("interested", EventInterestedUser.as_view()),
    path("attending", EventAttendingUser.as_view()),
    path("saved", SavedEvent.as_view()),
]
