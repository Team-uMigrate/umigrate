from django.urls import path
from .consumers import ChatConsumer


# Routes websocket requests to consumers
websocket_urlpatterns = [
    path('ws/messaging/<int:room_id>/', ChatConsumer),
]
