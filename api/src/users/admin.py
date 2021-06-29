from django.contrib import admin
from .models import CustomUser


# Register the user model with the admin site
admin.site.register(CustomUser)
