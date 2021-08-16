from typing import List
from model_bakery import baker
from rest_framework.test import APITestCase
from unittest.mock import patch, MagicMock

from common.constants.choices import Choices
from messaging.models import Message
from notifications.models import Notification, Device
from posts.models import Post
from users.models import CustomUser
from notifications.utils import (
    create_tagged_users_notification,
    create_message_notification,
    create_connection_request_notification,
    create_liked_shared_item_notification,
    send_push_notifications,
    PushMessage,
)


class CreateTaggedUsersNotificationTestCase(APITestCase):
    @patch("notifications.utils.send_push_notifications")
    def test_has_tagged_users(self, mock_send_push_notifications: MagicMock):
        # Arrange
        user: CustomUser = baker.make("CustomUser")
        users: List[CustomUser] = baker.make("CustomUser", _quantity=1)
        post: Post = baker.make("Post", creator=user, tagged_users=users)

        # Act
        create_tagged_users_notification(post)

        # Assert
        notification: Notification = mock_send_push_notifications.call_args.args[0]
        self.assertEqual(post, notification.content_object)
        self.assertEqual(post.creator_id, notification.creator_id)
        self.assertEqual(
            f"{user.preferred_name} has tagged you in a post!", notification.content
        )
        self.assertEqual(Choices.TAG_FIELD, notification.notification_type)
        self.assertTrue(notification.receivers.filter(id=users[0].id).exists())

    @patch("notifications.utils.send_push_notifications")
    def test_has_no_tagged_users(self, mock_send_push_notifications: MagicMock):
        # Arrange
        user: CustomUser = baker.make("CustomUser")
        post: Post = baker.make("Post", creator=user)

        # Act
        create_tagged_users_notification(post)

        # Assert
        mock_send_push_notifications.assert_not_called()


class CreateConnectionRequestNotificationTestCase(APITestCase):
    @patch("notifications.utils.send_push_notifications")
    def test_is_requesting(self, mock_send_push_notifications: MagicMock):
        # Arrange
        receiver: CustomUser = baker.make("CustomUser")
        sender: CustomUser = baker.make("CustomUser")

        # Act
        create_connection_request_notification(receiver, sender, True)

        # Assert
        notification: Notification = mock_send_push_notifications.call_args.args[0]
        self.assertEqual(sender, notification.content_object)
        self.assertEqual(sender.id, notification.creator_id)
        self.assertEqual(
            f"{sender.preferred_name} accepted your connection request",
            notification.content,
        )
        self.assertEqual(Choices.CONNECTION_FIELD, notification.notification_type)
        self.assertTrue(notification.receivers.filter(id=receiver.id).exists())

    @patch("notifications.utils.send_push_notifications")
    def test_is_accepting(self, mock_send_push_notifications: MagicMock):
        # Arrange
        receiver: CustomUser = baker.make("CustomUser")
        sender: CustomUser = baker.make("CustomUser")

        # Act
        create_connection_request_notification(receiver, sender, False)

        # Assert
        notification: Notification = mock_send_push_notifications.call_args.args[0]
        self.assertEqual(sender, notification.content_object)
        self.assertEqual(sender.id, notification.creator_id)
        self.assertEqual(
            f"{sender.preferred_name} sent you a connection request",
            notification.content,
        )
        self.assertEqual(Choices.CONNECTION_FIELD, notification.notification_type)
        self.assertTrue(notification.receivers.filter(id=receiver.id).exists())


class CreateMessageNotificationTestCase(APITestCase):
    @patch("notifications.utils.send_push_notifications")
    def test_has_receivers(self, mock_send_push_notifications: MagicMock):
        # Arrange
        users: List[CustomUser] = baker.make("CustomUser", _quantity=2)
        message: Message = baker.make("Message", creator=users[0])

        # Act
        create_message_notification(
            CustomUser.objects.exclude(id=users[0].id), users[0], message
        )

        # Assert
        notification: Notification = mock_send_push_notifications.call_args.args[0]
        self.assertEqual(message, notification.content_object)
        self.assertEqual(users[0].id, notification.creator_id)
        self.assertEqual(
            f"{users[0].preferred_name} sent you a message",
            notification.content,
        )
        self.assertEqual(Choices.MESSAGE_FIELD, notification.notification_type)
        self.assertTrue(notification.receivers.filter(id=users[1].id).exists())

    @patch("notifications.utils.send_push_notifications")
    def test_has_no_receivers(self, mock_send_push_notifications: MagicMock):
        # Arrange
        sender: CustomUser = baker.make("CustomUser")
        message: Message = baker.make("Message", creator=sender)

        # Act
        create_message_notification(CustomUser.objects.none(), sender, message)

        # Assert
        mock_send_push_notifications.assert_not_called()


class CreateLikedSharedItemNotificationTestCase(APITestCase):
    @patch("notifications.utils.send_push_notifications")
    def test(self, mock_send_push_notifications: MagicMock):
        # Arrange
        users: List[CustomUser] = baker.make("CustomUser", _quantity=2)
        post: Post = baker.make("Post", creator=users[0])

        # Act
        create_liked_shared_item_notification(post, users[1])

        # Assert
        notification: Notification = mock_send_push_notifications.call_args.args[0]
        self.assertEqual(post, notification.content_object)
        self.assertEqual(users[1].id, notification.creator_id)
        self.assertEqual(
            f"{users[1].preferred_name} liked your post!",
            notification.content,
        )
        self.assertEqual(Choices.LIKES_FIELD, notification.notification_type)
        self.assertTrue(notification.receivers.filter(id=users[0].id).exists())


class SendPushNotificationsTestCase(APITestCase):
    @patch("notifications.utils.PushClient")
    def test_has_push_messages(self, mock_push_client: MagicMock):
        # Arrange
        users: List[CustomUser] = baker.make("CustomUser", _quantity=2)
        notification: Notification = baker.make("Notification", creator=users[0])
        notification.receivers.add(users[1])
        device: Device = baker.make("Device", creator=users[1])

        # Act
        send_push_notifications(notification)

        # Assert
        push_messages: List[
            PushMessage
        ] = mock_push_client().publish_multiple.call_args.args[0]
        self.assertEqual(1, len(push_messages))
        self.assertEqual(device.expo_push_token, push_messages[0].to)
        self.assertEqual(notification.content, push_messages[0].body)
        self.assertEqual(notification.id, push_messages[0].data["id"])

    @patch("notifications.utils.PushClient")
    def test_has_no_push_messages(self, mock_push_client: MagicMock):
        # Arrange
        user: CustomUser = baker.make("CustomUser")
        notification: Notification = baker.make("Notification", creator=user)

        # Act
        send_push_notifications(notification)

        # Assert
        mock_push_client().publish_multiple.assert_not_called()
