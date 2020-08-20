from django.urls import path
from .consumers import NotificationConsumer


# Routes websocket requests to consumers
websocket_urlpatterns = [
    path('ws/notifications/', NotificationConsumer)
    #path('ws/notifications/<int:user_id>')
]
