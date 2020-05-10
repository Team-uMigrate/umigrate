from django.contrib import admin
from .models import Job


# Registers the job model with the admin site
admin.site.register(Job)
