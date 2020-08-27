from channels.routing import ProtocolTypeRouter, URLRouter
import messaging.routing
from channels.auth import AuthMiddlewareStack
import notifications.routing

# Maps asynchronous connections to routers
application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
           notifications.routing.websocket_urlpatterns +
           messaging.routing.websocket_urlpatterns
        )
    )
})
