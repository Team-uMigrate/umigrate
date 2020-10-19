from django.urls import path
from .api_views import CommentListCreate, CommentRetrieveUpdateDestroy, ReplyListCreate, \
    ReplyRetrieveUpdateDestroy

# Comments url patterns
urlpatterns = [
    path('', CommentListCreate.as_view()),
    path('<int:id>', CommentRetrieveUpdateDestroy.as_view()),
    path('replies/', ReplyListCreate.as_view()),
    path('replies/<int:id>', ReplyRetrieveUpdateDestroy.as_view()),
]
