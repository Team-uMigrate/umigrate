from rest_framework.routers import DefaultRouter
from django.urls import path
from .api_views import NotificationList, DeviceViewSet

# Notifications url patterns
router = DefaultRouter(trailing_slash=False)
router.register(r"devices/", DeviceViewSet, basename="devices")
urlpatterns = [path("notifications/", NotificationList.as_view())] + router.urls
