from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .api_views import NotificationList, DeviceViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r"", DeviceViewSet, basename="devices")

# Notifications url patterns
urlpatterns = [
    path("notifications", NotificationList.as_view()),
    path("devices/", include(router.urls)),
]
