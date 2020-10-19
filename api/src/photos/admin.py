from django.contrib import admin
from .models import Photo


# Registers the photo collection member model with the admin site
admin.site.register(Photo)
