from channels.routing import ProtocolTypeRouter, URLRouter
import messaging.routing
from channels.auth import AuthMiddlewareStack

application = ProtocolTypeRouter(
    {
        "websocket": AuthMiddlewareStack(
            URLRouter(messaging.routing.websocket_urlpatterns)
        )
    }
)
"""
Routing for asynchronous connections.
"""
