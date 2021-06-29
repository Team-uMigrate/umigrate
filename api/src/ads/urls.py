from django.urls import path
from rest_framework.routers import DefaultRouter
from .api_views import AdViewSet, LikedAds, SavedAds, AdLikes

router = DefaultRouter(trailing_slash=False)
router.register(r"", AdViewSet, basename="ads")

urlpatterns = router.urls + [
    path("liked", LikedAds.as_view()),
    path("saved", SavedAds.as_view()),
    path("<int:id>/likes", AdLikes.as_view()),
]
"""
Ads url patterns.
"""
