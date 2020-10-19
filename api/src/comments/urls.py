from django.urls import path
from rest_framework.routers import DefaultRouter
from .api_views import CommentViewSet, ReplyViewSet, CommentLike, ReplyLike

# Comments url patterns
router = DefaultRouter(trailing_slash=False)
router.register(r'', CommentViewSet, basename='comments')
router.register(r'replies', ReplyViewSet, basename='replies')
urlpatterns = router.urls + [
    path('like', CommentLike.as_view()),
    path('replies/like', ReplyLike.as_view()),
]
