from django.contrib import admin
from .models import Poll, PollComment, Option, Vote


# Registers the pol, poll comment, option, and vote models with the admin site
admin.site.register(Poll)
admin.site.register(PollComment)
admin.site.register(Option)
admin.site.register(Vote)
