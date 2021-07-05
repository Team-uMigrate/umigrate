from django.urls import path
from .api_views import (
    UserList,
    UserRetrieve,
    ConnectUser,
    BlockUser,
    NotificationPreferences,
)

# Users url patterns
urlpatterns = [
    path("", UserList.as_view()),
    path("notification_preferences", NotificationPreferences.as_view()),
    path("<int:id>", UserRetrieve.as_view()),
    path("connect", ConnectUser.as_view()),
    path("block", BlockUser.as_view()),
]
