from django.urls import path
from .api_views import UserList, UserRetrieve, ConnectUser, BlockUser, SavedPosts

# Users url patterns
urlpatterns = [
    path('', UserList.as_view()),
    path('<int:id>', UserRetrieve.as_view()),
    path('connect', ConnectUser.as_view()),
    path('block', BlockUser.as_view()),
    path('posts', SavedPosts.as_view())
]
