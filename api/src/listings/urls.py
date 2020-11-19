from django.urls import path
from rest_framework.routers import DefaultRouter
from .api_views import ListingViewSet, ListingLike, SavedListing

# Listings url patterns
router = DefaultRouter(trailing_slash=False)
router.register(r"", ListingViewSet, basename="listings")
urlpatterns = router.urls + [
    path("like", ListingLike.as_view()),
    path("saved", SavedListing.as_view()),
]
