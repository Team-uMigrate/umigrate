from django.http import HttpRequest
from model_bakery import baker
from rest_framework import status
from rest_framework.test import APITestCase
from notifications.models import Notification
from notifications.api_views import ViewedReceivedNotifications


class ViewedReceivedNotificationsTestCase(APITestCase):
    def test_get_serializer_class_notification_serializer(self):
        pass

    def test_get_serializer_class_received_notifications_serializer(self):
        pass

    def test_get_query_set_received_and_viewed_notifications(self):
        pass

    def test_post_set_viewed(self):
        # Arrange
        request = HttpRequest()
        request.user = baker.make("CustomUser")
        notification: Notification = baker.make("Notification", creator=request.user)
        notification.receivers.add(request.user)
        request.data = {"received_notifications": [notification.id]}
        api_view = ViewedReceivedNotifications()

        # Act
        response = api_view.post(request)

        # Assert
        self.assertEqual(status.HTTP_204_NO_CONTENT, response.status_code)
        self.assertFalse(notification.receivers.filter(id=request.user.id).exists())
        self.assertTrue(notification.viewers.filter(id=request.user.id).exists())

    def test_post_not_received(self):
        # Arrange
        request = HttpRequest()
        request.user = baker.make("CustomUser")
        notification: Notification = baker.make("Notification", creator=request.user)
        request.data = {"received_notifications": [notification.id]}
        api_view = ViewedReceivedNotifications()

        # Act
        response = api_view.post(request)

        # Assert
        self.assertEqual(status.HTTP_204_NO_CONTENT, response.status_code)
        self.assertFalse(notification.receivers.filter(id=request.user.id).exists())
        self.assertFalse(notification.viewers.filter(id=request.user.id).exists())

    def test_post_invalid_data(self):
        # Arrange
        request = HttpRequest()
        request.data = {"received_notifications": [1]}
        api_view = ViewedReceivedNotifications()

        # Act
        response = api_view.post(request)

        # Assert
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)
