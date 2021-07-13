from django.urls import path
from rest_framework.routers import DefaultRouter
from .api_views import (
    ListingViewSet,
    LikedListings,
    SavedListings,
    ListingLikes,
    ContactedListings,
    ConfirmedListings,
    ListingContacted,
    ListingConfirmed,
    ContactedRoommatePost,
    ConfirmedRoommatePost,
    RoommatePostContacted,
    RoommatePostConfirmed,
)

router = DefaultRouter(trailing_slash=False)
router.register(r"", ListingViewSet, basename="listings")

urlpatterns = router.urls + [
    path("liked", LikedListings.as_view()),
    path("saved", SavedListings.as_view()),
    path("<int:id>/likes", ListingLikes.as_view()),
    path("contacted", ContactedListings.as_view()),
    path("confirmed", ConfirmedListings.as_view()),
    path("<int:id>/contacted", ListingContacted.as_view()),
    path("<int:id>/confirmed", ListingConfirmed.as_view()),
    # path("roommate/contacted", ContactedRoommatePost.as_view()),
    # path("roommate/confirmed", ConfirmedRoommatePost.as_view()),
    # path("roommate/<int:id>/contacted", RoommatePostContacted.as_view()),
    # path("roommate/<int:id>/confirmed", RoommatePostConfirmed.as_view()),
]
"""
Listings url patterns.
"""
