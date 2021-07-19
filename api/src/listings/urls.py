from django.urls import path
from rest_framework.routers import DefaultRouter
from .api_views import (
    ListingViewSet,
    LikedListings,
    SavedListings,
    ListingLikes,
    ContactedListings,
    ConfirmedListings,
    ListingContactedUsers,
    ListingConfirmedUsers,
    ConfirmedRoommatePosts,
    ConfirmedRoommatePosts,
    RoommatePostContactedUsers,
    RoommatePostConfirmedUsers,
)

router = DefaultRouter(trailing_slash=False)
router.register(r"", ListingViewSet, basename="listings")

urlpatterns = router.urls + [
    path("liked", LikedListings.as_view()),
    path("saved", SavedListings.as_view()),
    path("<int:id>/likes", ListingLikes.as_view()),
    path("contacted", ContactedListings.as_view()),
    path("confirmed", ConfirmedListings.as_view()),
    path("roommates/<int:id>/contacted-users", ListingContactedUsers.as_view()),
    path("roommates/<int:id>/confirmed-users", ListingConfirmedUsers.as_view()),
    # path("roommates/contacted", ConfirmedRoommatePosts.as_view()),
    # path("roommates/confirmed", ConfirmedRoommatePosts.as_view()),
    # path("roommate/<int:id>/contacted", RoommatePostContactedUsers.as_view()),
    # path("roommate/<int:id>/confirmed", RoommatePostConfirmedUsers.as_view()),
]
"""
Listings url patterns.
"""
