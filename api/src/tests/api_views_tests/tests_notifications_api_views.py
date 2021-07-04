from django.db.models import QuerySet
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
        # Arrange
        request = HttpRequest()
        request.user = baker.make("CustomUser")
        user = baker.make("CustomUser")
        received_notification: Notification = baker.make("Notification", creator=user)
        received_notification.receivers.add(request.user)
        viewed_notification: Notification = baker.make("Notification", creator=user)
        viewed_notification.viewers.add(request.user)
        api_view = ViewedReceivedNotifications(request=request)

        # Act
        queryset: QuerySet[Notification] = api_view.get_queryset()

        # Arrange
        self.assertTrue(queryset.filter(id=received_notification.id).exists())
        self.assertTrue(queryset.filter(id=viewed_notification.id).exists())

    def test_post_set_viewed(self):
        # Arrange
        request = HttpRequest()
        request.user = baker.make("CustomUser")
        user = baker.make("CustomUser")
        notification: Notification = baker.make("Notification", creator=user)
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
        user = baker.make("CustomUser")
        notification: Notification = baker.make("Notification", creator=user)
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
