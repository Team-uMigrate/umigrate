from django.urls import path
from .api_views import PollListCreate, PollRetrieveUpdateDestroy, PollCommentListCreate, \
    PollCommentRetrieveUpdateDestroy, OptionListCreate, VoteListCreate, PollLike, PollCommentLike

# Polls url patterns
urlpatterns = [
    path('polls/', PollListCreate.as_view()),
    path('polls/<int:id>', PollRetrieveUpdateDestroy.as_view()),
    path('polls/<int:id>/comments/', PollCommentListCreate.as_view()),
    path('polls/comments/<int:id>', PollCommentRetrieveUpdateDestroy.as_view()),
    path('polls/<int:id>/like', PollLike.as_view()),
    path('polls/comments/<int:id>/like', PollCommentLike.as_view()),
    path('polls/<int:id>/options/', OptionListCreate.as_view()),
    path('polls/options/<int:id>/votes/', VoteListCreate.as_view()),
]