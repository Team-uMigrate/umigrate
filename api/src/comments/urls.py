from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import (
    CommentViewSet,
    ReplyViewSet,
    LikedComments,
    LikedReplies,
    SavedComments,
    SavedReplies,
    CommentLikes,
    ReplyLikes,
)

router = DefaultRouter(trailing_slash=False)
router.register(r"", CommentViewSet, basename="comments")

replies_router = DefaultRouter(trailing_slash=False)
replies_router.register(r"", ReplyViewSet, basename="replies")

# Comments url patterns
urlpatterns = router.urls + [
    path("liked", LikedComments.as_view()),
    path("saved", SavedComments.as_view()),
    path("<int:id>/likes", CommentLikes.as_view()),
    path("replies/", include(replies_router.urls)),
    path("replies/liked", LikedReplies.as_view()),
    path("replies/saved", SavedReplies.as_view()),
    path("replies/<int:id>/likes", ReplyLikes.as_view()),
]
