from channels.routing import ProtocolTypeRouter, URLRouter
import messaging.routing
from channels.auth import AuthMiddlewareStack


# Maps asynchronous connections to routers
application = ProtocolTypeRouter(
    {
        "websocket": AuthMiddlewareStack(
            URLRouter(messaging.routing.websocket_urlpatterns)
        )
    }
)
