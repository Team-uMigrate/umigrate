from django.urls import path
from rest_framework.routers import DefaultRouter
from .api_views import PostViewSet, LikedPost, SavedPost, PostLikes

# Posts url patterns
router = DefaultRouter(trailing_slash=False)
router.register(r"", PostViewSet, basename="posts")
urlpatterns = router.urls + [
    path("liked", LikedPost.as_view()),
    path("saved", SavedPost.as_view()),
    path("<int:id>/likes", PostLikes.as_view()),
]
