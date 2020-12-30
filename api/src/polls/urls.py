from django.urls import path
from rest_framework.routers import DefaultRouter
from .api_views import (
    PollViewSet,
    LikedPolls,
    SavedPolls,
    PollLikes,
    OptionListCreate,
    VoteListCreate,
)

router = DefaultRouter(trailing_slash=False)
router.register(r"", PollViewSet, basename="polls")

# Polls url patterns
urlpatterns = router.urls + [
    path("liked", LikedPolls.as_view()),
    path("saved", SavedPolls.as_view()),
    path("<int:id>/likes", PollLikes.as_view()),
    path("options/", OptionListCreate.as_view()),
    path("options/votes/", VoteListCreate.as_view()),
]
