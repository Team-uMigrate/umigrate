from django.urls import path
from .api_views import RoomListCreate, RoomRetrieveUpdateDestroy, MessageList, RoomMembers

# Messaging url patterns
urlpatterns = [
    path('rooms/', RoomListCreate.as_view()),
    path('rooms/<int:id>', RoomRetrieveUpdateDestroy.as_view()),
    path('rooms/<int:id>/messages/', MessageList.as_view()),
    path('rooms/<int:id>/members', RoomMembers.as_view()),
]
