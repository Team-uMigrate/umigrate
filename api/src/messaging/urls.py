from django.urls import path
from .api_views import RoomListCreate, RoomRetrieveUpdateDestroy, MessageList, RoomMembers

# Messaging url patterns
urlpatterns = [
    path('', RoomListCreate.as_view()),
    path('<int:id>', RoomRetrieveUpdateDestroy.as_view()),
    path('<int:id>/messages/', MessageList.as_view()),
    path('<int:id>/members', RoomMembers.as_view()),
]
