from django.urls import path
from rest_framework.routers import DefaultRouter
from .api_views import ListingViewSet, LikedListing, SavedListing, ListingLikes

# Listings url patterns
router = DefaultRouter(trailing_slash=False)
router.register(r"", ListingViewSet, basename="listings")
urlpatterns = router.urls + [
    path("liked", LikedListing.as_view()),
    path("saved", SavedListing.as_view()),
    path("<int:id>/likes", ListingLikes.as_view()),
]
