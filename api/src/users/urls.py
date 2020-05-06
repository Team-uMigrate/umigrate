from django.urls import path
from .api_views import UserList, UserRetrieve


# Users url patterns
urlpatterns = [
    path('users/', UserList.as_view()),
    path('users/<int:id>', UserRetrieve.as_view()),
]
