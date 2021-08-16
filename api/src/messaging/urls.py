from django.urls import path
from rest_framework.routers import DefaultRouter
from .api_views import (
    RoomViewSet,
    AddRemoveMembers,
    MessageList,
)

# TODO: Remove this import later
from .views import index, room

router = DefaultRouter(trailing_slash=False)
router.register(r"", RoomViewSet, basename="rooms")

urlpatterns = router.urls + [
    path("<int:id>/messages/", MessageList.as_view()),
    path("<int:id>/membership/", AddRemoveMembers.as_view()),
    # TODO: Remove these 2 paths later
    path("messaging/", index, name="index"),
    path("messaging/<str:room_id>/", room, name="room"),
]
"""
Messaging url patterns.
"""
