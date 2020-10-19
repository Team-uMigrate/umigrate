from django.contrib import admin
from .models import Post


# Registers the Post model with the admin site
admin.site.register(Post)
