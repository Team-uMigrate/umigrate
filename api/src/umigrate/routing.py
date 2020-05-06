from channels.routing import ProtocolTypeRouter, URLRouter
# import messaging.routing
from channels.sessions import SessionMiddlewareStack


# Maps asynchronous connections to routers
application = ProtocolTypeRouter({
    # 'websocket': SessionMiddlewareStack(
    #     URLRouter(
    #         messaging.routing.websocket_urlpatterns
    #     )
    # )
})
