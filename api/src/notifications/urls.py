from django.urls import path
from .api_views import NotificationListCreate, NotificationRetrieveUpdateDestroy


# Notifications url patterns
urlpatterns = [
    path('notifications/', NotificationListCreate.as_view()),
    path('notifications/<int:id>', NotificationRetrieveUpdateDestroy.as_view()),
]
