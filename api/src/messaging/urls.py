from django.urls import path
from .api_views import RoomListCreate, RoomRetrieveUpdateDestroy, MessageList, RoomMembers

# TODO: Remove this import later
from .views import index, room

# Messaging url patterns
urlpatterns = [
    path('', RoomListCreate.as_view()),
    path('<int:id>', RoomRetrieveUpdateDestroy.as_view()),
    path('<int:id>/messages/', MessageList.as_view()),
    path('<int:id>/members', RoomMembers.as_view()),

    # TODO: Remove these 2 paths later
    path('messaging/', index, name='index'),
    path('messaging/<str:room_id>/', room, name='room')
]
