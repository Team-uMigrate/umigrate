from django.contrib import admin
from .models import Housing, HousingComment


# Registers the housing and housing comment models with the admin site
admin.site.register(Housing)
admin.site.register(HousingComment)
