from django.contrib import admin
from .models import Poll, Option, Vote


# Register the pol, option, and vote models with the admin site
admin.site.register(Poll)
admin.site.register(Option)
admin.site.register(Vote)
