from django.contrib import admin
from .models import Listing, RoommatePost


# Register the Listing and RoommatePost models with the admin site
admin.site.register(Listing)
admin.site.register(RoommatePost)
