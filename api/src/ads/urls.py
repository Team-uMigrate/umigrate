from django.urls import path
from rest_framework.routers import DefaultRouter
from .api_views import AdViewSet, LikedAd, AdLikes

# Ads url patterns
router = DefaultRouter(trailing_slash=False)
router.register(r"", AdViewSet, basename="ads")
urlpatterns = router.urls + [
    path("liked", LikedAd.as_view()),
    path("<int:id>/likes", AdLikes.as_view()),
]
