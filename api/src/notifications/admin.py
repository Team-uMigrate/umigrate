from django.contrib import admin
from .models import Notification, Device

# Registers the Notification and Device models with the admin site
admin.site.register(Notification)
admin.site.register(Device)
