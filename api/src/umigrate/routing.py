from channels.routing import ProtocolTypeRouter, URLRouter
import messaging.routing
from channels.auth import AuthMiddlewareStack


# Routing for asynchronous connections
application = ProtocolTypeRouter(
    {
        "websocket": AuthMiddlewareStack(
            URLRouter(messaging.routing.websocket_urlpatterns)
        )
    }
)
