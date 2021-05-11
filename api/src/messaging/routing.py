from django.urls import path
from .consumers import ChatConsumer

# WebSocket url patterns
websocket_urlpatterns = [
    path("ws/messaging/<int:room_id>", ChatConsumer.as_asgi()),
]
