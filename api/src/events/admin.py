from django.contrib import admin
from .models import Event, EventComment


# Registers the event and event models model with the admin site
admin.site.register(Event)
admin.site.register(EventComment)
