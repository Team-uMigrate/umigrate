from django.urls import path
from rest_framework.routers import DefaultRouter
from .api_views import (
    PollViewSet,
    LikedPoll,
    SavedPoll,
    PollLikes,
    OptionListCreate,
    VoteListCreate,
)

# Polls url patterns
router = DefaultRouter(trailing_slash=False)
router.register(r"", PollViewSet, basename="polls")
urlpatterns = router.urls + [
    path("liked", LikedPoll.as_view()),
    path("saved", SavedPoll.as_view()),
    path("<int:id>/likes", PollLikes.as_view()),
    path("options/", OptionListCreate.as_view()),
    path("options/votes/", VoteListCreate.as_view()),
]
