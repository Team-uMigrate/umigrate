from django.contrib import admin
from .models import Room, Message


# Register the room and message models with the admin site
admin.site.register(Room)
admin.site.register(Message)
