from django.urls import path
from .api_views import PollListCreate, PollRetrieveUpdateDestroy, OptionListCreate, VoteListCreate, PollLike

# Polls url patterns
urlpatterns = [
    path('', PollListCreate.as_view()),
    path('<int:id>', PollRetrieveUpdateDestroy.as_view()),
    path('like', PollLike.as_view()),
    path('options/', OptionListCreate.as_view()),
    path('options/votes/', VoteListCreate.as_view()),
]
