from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .api_views import ViewedReceivedNotifications, DeviceViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r"", DeviceViewSet, basename="devices")

urlpatterns = [
    path("notifications/", ViewedReceivedNotifications.as_view()),
    path("devices/", include(router.urls)),
]
"""
Notifications url patterns.
"""
