from django.urls import path
from .api_views import UserList, UserRetrieve, FollowUser, BlockUser


# Users url patterns
urlpatterns = [
    path('users/', UserList.as_view()),
    path('users/<int:id>', UserRetrieve.as_view()),
    path('users/<int:id>/follow', FollowUser.as_view()),
    path('users/<int:id>/block', BlockUser.as_view()),
]
