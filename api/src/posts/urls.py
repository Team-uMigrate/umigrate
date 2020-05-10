from django.urls import path
from .api_views import PostListCreate, PostRetrieveUpdateDestroy, PostCommentListCreate, \
    PostCommentRetrieveUpdateDestroy, PostLike, PostCommentLike

# Posts url patterns
urlpatterns = [
    path('posts/', PostListCreate.as_view()),
    path('posts/<int:id>', PostRetrieveUpdateDestroy.as_view()),
    path('posts/<int:id>/comments/', PostCommentListCreate.as_view()),
    path('posts/comments/<int:id>', PostCommentRetrieveUpdateDestroy.as_view()),
    path('posts/<int:id>/like', PostLike.as_view()),
    path('posts/comments/<int:id>/like', PostCommentLike.as_view()),
]
