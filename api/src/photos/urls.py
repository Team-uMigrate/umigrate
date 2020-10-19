from django.urls import path
from .api_views import PhotoCreate, PhotoRetrieveUpdateDestroy

# Photo url patterns
urlpatterns = [
    path('', PhotoCreate.as_view()),
    path('<int:id>', PhotoRetrieveUpdateDestroy.as_view()),
]
