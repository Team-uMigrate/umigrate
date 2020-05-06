from django.urls import path
from .api_views import PollListCreate, PollRetrieveUpdateDestroy, PollCommentListCreate, PollCommentRetrieveUpdateDestroy, OptionListCreate, VoteListCreate


# Polls url patterns
urlpatterns = [
    path('polls/', PollListCreate.as_view()),
    path('polls/<int:id>', PollRetrieveUpdateDestroy.as_view()),
    path('polls/<int:id>/comments/', PollCommentListCreate.as_view()),
    path('polls/comments/<int:id>', PollCommentRetrieveUpdateDestroy.as_view()),
    path('polls/<int:id>/options/', OptionListCreate.as_view()),
    path('polls/options/<int:id>/vote/', VoteListCreate.as_view()),
]
