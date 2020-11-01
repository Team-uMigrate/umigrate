from django.urls import path
from rest_framework.routers import DefaultRouter
from .api_views import AdViewSet, AdLike

# Ads url patterns
router = DefaultRouter(trailing_slash=False)
router.register(r"", AdViewSet, basename="ads")
urlpatterns = router.urls + [
    path("like", AdLike.as_view()),
]
