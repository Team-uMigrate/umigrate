from django.urls import path
from rest_framework.routers import DefaultRouter
from .api_views import (
    EventViewSet,
    LikedEvents,
    SavedEvents,
    EventLikes,
    InterestedEvents,
    AttendingEvents,
)

router = DefaultRouter(trailing_slash=False)
router.register(r"", EventViewSet, basename="events")

# Events url patterns
urlpatterns = router.urls + [
    path("liked", LikedEvents.as_view()),
    path("saved", SavedEvents.as_view()),
    path("<int:id>/likes", EventLikes.as_view()),
    path("interested", InterestedEvents.as_view()),
    path("attending", AttendingEvents.as_view()),
]
