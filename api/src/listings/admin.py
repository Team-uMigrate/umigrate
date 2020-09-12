from django.contrib import admin
from .models import Listing, ListingComment


# Registers the housing and housing comment models with the admin site
admin.site.register(Listing)
admin.site.register(ListingComment)
