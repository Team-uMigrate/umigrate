from django.contrib import admin
from .models import Room, Message


# Registers the room and message models with the admin site
admin.site.register(Room)
admin.site.register(Message)
