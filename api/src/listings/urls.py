from django.urls import path
from .api_views import ListingListCreate, ListingRetrieveUpdateDestroy, ListingLike

# Listing listings url patterns
urlpatterns = [
    path('', ListingListCreate.as_view()),
    path('<int:id>', ListingRetrieveUpdateDestroy.as_view()),
    path('like', ListingLike.as_view()),
]
