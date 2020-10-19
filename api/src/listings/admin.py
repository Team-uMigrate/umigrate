from django.contrib import admin
from .models import Listing


# Registers the Listing model with the admin site
admin.site.register(Listing)
