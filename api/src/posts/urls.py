from django.urls import path
from .api_views import PostListCreate, PostRetrieveUpdateDestroy, PostCommentListCreate, \
    PostCommentRetrieveUpdateDestroy, PostLike, PostCommentLike, PostCommentReplyListCreate, PostCommentReplyRetrieveUpdateDestroy

# Posts url patterns
urlpatterns = [
    path('', PostListCreate.as_view()),
    path('<int:id>', PostRetrieveUpdateDestroy.as_view()),
    path('comments/', PostCommentListCreate.as_view()),
    path('comments/<int:id>', PostCommentRetrieveUpdateDestroy.as_view()),
    path('like', PostLike.as_view()),
    path('comments/like', PostCommentLike.as_view()),
    path('replies/', PostCommentReplyListCreate.as_view()), 
    path('replies/<int:id>', PostCommentReplyRetrieveUpdateDestroy.as_view())
]
