from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import NotificationList, DeviceViewSet

# Notifications url patterns
router = DefaultRouter(trailing_slash=False)
router.register(r"", DeviceViewSet, basename="devices")
url_patterns = [path("notifications/", NotificationList.as_view())] + router.urls
