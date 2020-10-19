from django.urls import path
from .api_views import AdListCreate, AdRetrieveUpdateDestroy, AdLike


# Ads url patterns
urlpatterns = [
    path('', AdListCreate.as_view()),
    path('<int:id>', AdRetrieveUpdateDestroy.as_view()),
    path('like', AdLike.as_view()),
]
