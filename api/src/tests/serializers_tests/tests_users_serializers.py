from django.http import HttpRequest
from rest_framework.test import APITestCase
from model_bakery import baker
from common.constants.choices import Choices
from users.serializers import BasicUserSerializer
from users.models import CustomUser


class BasicUserSerializerTestCase(APITestCase):
    def test_get_connection_status_connected(self):
        # Arrange
        request = HttpRequest()
        request.user = baker.make("CustomUser")
        user: CustomUser = baker.make("CustomUser")
        request.user.connected_users.add(user)
        user.connected_users.add(request.user)
        serializer = BasicUserSerializer(context={"request": request})

        # Act
        status: int = serializer.get_connection_status(user)

        # Assert
        self.assertEqual(Choices.CONNECTION_STATUS_CHOICES["Connected"], status)

    def test_get_connection_status_request_sent(self):
        # Arrange
        request = HttpRequest()
        request.user = baker.make("CustomUser")
        user: CustomUser = baker.make("CustomUser")
        request.user.connected_users.add(user)
        serializer = BasicUserSerializer(context={"request": request})

        # Act
        status: int = serializer.get_connection_status(user)

        # Assert
        self.assertEqual(Choices.CONNECTION_STATUS_CHOICES["Request Sent"], status)

    def test_get_connection_status_request_received(self):
        # Arrange
        request = HttpRequest()
        request.user = baker.make("CustomUser")
        user: CustomUser = baker.make("CustomUser")
        user.connected_users.add(request.user)
        serializer = BasicUserSerializer(context={"request": request})

        # Act
        status: int = serializer.get_connection_status(user)

        # Assert
        self.assertEqual(Choices.CONNECTION_STATUS_CHOICES["Request Received"], status)

    def test_get_connection_status_not_connected(self):
        # Arrange
        request = HttpRequest()
        request.user = baker.make("CustomUser")
        user: CustomUser = baker.make("CustomUser")
        serializer = BasicUserSerializer(context={"request": request})

        # Act
        status: int = serializer.get_connection_status(user)

        # Assert
        self.assertEqual(Choices.CONNECTION_STATUS_CHOICES["Not Connected"], status)

    def test_get_is_blocked_true(self):
        # Arrange
        request = HttpRequest()
        request.user = baker.make("CustomUser")
        user: CustomUser = baker.make("CustomUser")
        request.user.blocked_users.add(user)
        serializer = BasicUserSerializer(context={"request": request})

        # Act
        is_blocked = serializer.get_is_blocked(user)

        # Assert
        self.assertTrue(is_blocked)

    def test_get_is_blocked_false(self):
        # Arrange
        request = HttpRequest()
        request.user = baker.make("CustomUser")
        user: CustomUser = baker.make("CustomUser")
        serializer = BasicUserSerializer(context={"request": request})

        # Act
        is_blocked = serializer.get_is_blocked(user)

        # Assert
        self.assertFalse(is_blocked)
