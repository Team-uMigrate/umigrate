from django.urls import path
from rest_framework.routers import DefaultRouter
from .api_views import (
    AdViewSet,
    LikedAds,
    SavedAds,
    AdLikes,
    ContactedAds,
    ConfirmedAds,
    AdContacted,
    AdConfirmed,
)

router = DefaultRouter(trailing_slash=False)
router.register(r"", AdViewSet, basename="ads")

urlpatterns = router.urls + [
    path("liked", LikedAds.as_view()),
    path("saved", SavedAds.as_view()),
    path("<int:id>/likes", AdLikes.as_view()),
    path("contacted", ContactedAds.as_view()),
    path("confirmed", ConfirmedAds.as_view()),
    path("<int:id>/contacted", AdContacted.as_view()),
    path("<int:id>/confirmed", AdConfirmed.as_view()),
]
"""
Ads url patterns.
"""
