from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import CommentViewSet, ReplyViewSet, CommentLike, ReplyLike

# Comments url patterns
router = DefaultRouter(trailing_slash=False)
router.register(r"", CommentViewSet, basename="comments")
replies_router = DefaultRouter(trailing_slash=False)
replies_router.register(r"", ReplyViewSet, basename="replies")
urlpatterns = router.urls + [
    path("replies/", include(replies_router.urls)),
    path("like", CommentLike.as_view()),
    path("replies/like", ReplyLike.as_view()),
]
