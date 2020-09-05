from django.urls import path
from .api_views import UserList, UserRetrieve, FollowUser, BlockUser


# Users url patterns
urlpatterns = [
    path('', UserList.as_view()),
    path('<int:id>', UserRetrieve.as_view()),
    path('<int:id>/follow', FollowUser.as_view()),
    path('<int:id>/block', BlockUser.as_view()),
]
