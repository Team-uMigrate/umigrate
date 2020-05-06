from django.contrib import admin
from .models import Post, PostComment


# Registers the post and post comment model with the admin site
admin.site.register(Post)
admin.site.register(PostComment)
