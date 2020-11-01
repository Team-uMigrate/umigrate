from django.contrib import admin
from .models import Event


# Registers the Event model with the admin site
admin.site.register(Event)
