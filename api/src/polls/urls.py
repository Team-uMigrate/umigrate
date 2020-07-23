from django.urls import path
from .api_views import PollListCreate, PollRetrieveUpdateDestroy, PollCommentListCreate, \
    PollCommentRetrieveUpdateDestroy, OptionListCreate, VoteListCreate, PollLike, PollCommentLike

# Polls url patterns
urlpatterns = [
    path('', PollListCreate.as_view()),
    path('<int:id>', PollRetrieveUpdateDestroy.as_view()),
    path('<int:id>/comments/', PollCommentListCreate.as_view()),
    path('comments/<int:id>', PollCommentRetrieveUpdateDestroy.as_view()),
    path('<int:id>/like', PollLike.as_view()),
    path('comments/<int:id>/like', PollCommentLike.as_view()),
    path('<int:id>/options/', OptionListCreate.as_view()),
    path('options/<int:id>/votes/', VoteListCreate.as_view()),
]
