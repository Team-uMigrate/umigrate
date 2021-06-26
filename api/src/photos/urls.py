from django.urls import path
from .api_views import PhotoCreate, PhotoRetrieveUpdateDestroy

urlpatterns = [
    path("", PhotoCreate.as_view()),
    path("<int:id>", PhotoRetrieveUpdateDestroy.as_view()),
]
"""
Photo url patterns.
"""
