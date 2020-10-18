from django.urls import path
from .api_views import ImageCreate, ImageRetrieveUpdateDestroy

# Image url patterns
urlpatterns = [
    path('', ImageCreate.as_view()),
    path('<int:id>', ImageRetrieveUpdateDestroy.as_view()),
]