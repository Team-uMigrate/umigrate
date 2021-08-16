from django.urls import path
from rest_framework.routers import DefaultRouter
from .api_views import PostViewSet, LikedPosts, SavedPosts, PostLikes

router = DefaultRouter(trailing_slash=False)
router.register(r"", PostViewSet, basename="posts")

urlpatterns = router.urls + [
    path("liked", LikedPosts.as_view()),
    path("saved", SavedPosts.as_view()),
    path("<int:id>/likes", PostLikes.as_view()),
]
"""
Posts url patterns.
"""
