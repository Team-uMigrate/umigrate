from django.contrib import admin
from .models import Comment, Reply


# Registers the comment and reply models with the admin site
admin.site.register(Comment)
admin.site.register(Reply)
