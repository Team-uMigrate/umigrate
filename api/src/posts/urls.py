from django.urls import path
from rest_framework.routers import DefaultRouter
from .api_views import PostViewSet, PostLike, SavedPost

# Posts url patterns
router = DefaultRouter(trailing_slash=False)
router.register(r"", PostViewSet, basename="posts")
urlpatterns = router.urls + [
    path("like", PostLike.as_view()),
    path("save", SavedPost.as_view()),
]
