from django.urls import path
from rest_framework.routers import DefaultRouter
from .api_views import ListingViewSet, LikedListings, SavedListings, ListingLikes

router = DefaultRouter(trailing_slash=False)
router.register(r"", ListingViewSet, basename="listings")

urlpatterns = router.urls + [
    path("liked", LikedListings.as_view()),
    path("saved", SavedListings.as_view()),
    path("<int:id>/likes", ListingLikes.as_view()),
]
"""
Listings url patterns.
"""
