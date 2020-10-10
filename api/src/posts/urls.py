from django.urls import path
from .api_views import PostListCreate, PostRetrieveUpdateDestroy, PostCommentListCreate, \
    PostCommentRetrieveUpdateDestroy, PostLike, PostCommentLike

# Posts url patterns
urlpatterns = [
    path('', PostListCreate.as_view()),
    path('<int:id>', PostRetrieveUpdateDestroy.as_view()),
    path('comments/', PostCommentListCreate.as_view()),
    path('comments/<int:id>', PostCommentRetrieveUpdateDestroy.as_view()),
    path('like', PostLike.as_view()),
    path('comments/like', PostCommentLike.as_view()),
]
