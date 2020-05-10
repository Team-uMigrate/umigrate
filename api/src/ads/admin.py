from django.contrib import admin
from .models import Ad, AdComment


# Registers the ad and ad comment models with the admin site
admin.site.register(Ad)
admin.site.register(AdComment)
