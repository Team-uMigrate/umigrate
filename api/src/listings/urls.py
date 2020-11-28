from django.urls import path
from rest_framework.routers import DefaultRouter
from .api_views import ListingViewSet, ListingLike, SavedListing, ListingLikes

# Listings url patterns
router = DefaultRouter(trailing_slash=False)
router.register(r"", ListingViewSet, basename="listings")
urlpatterns = router.urls + [
    path("like", ListingLike.as_view()),
    path("save", SavedListing.as_view()),
    path("<int:id>/likes", ListingLikes.as_view()),
]
