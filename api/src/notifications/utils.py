from typing import List
from django.http import HttpRequest
from users.models import CustomUser
from events.models import Event
from django.contrib.contenttypes.models import ContentType
from django.db.models.query import QuerySet
from exponent_server_sdk import PushMessage, PushClient
from comments.models import Comment, Reply
from common.abstract_models import AbstractPostModel
from messaging.models import Message
from notifications.models import Notification
from notifications.serializers import NotificationSerializer


def create_tagged_users_notification(
    created_data: AbstractPostModel or Comment or Message or Reply,
) -> None:
    """
    A function that sends push notifications to all tagged users for a shared item.
    """

    tagged_users: QuerySet[CustomUser] = created_data.tagged_users.all()
    if tagged_users.exists():
        content_type = ContentType.objects.get_for_model(created_data)

        # todo: remove hardcoded list of content types that start with vowels and check if first letter is a vowel
        if content_type.model in ["ad", "event"]:
            content = f"{created_data.creator.preferred_name} has tagged you in an {content_type.model}!"

        else:
            content = f"{created_data.creator.preferred_name} has tagged you in a {content_type.model}!"

        notification = Notification(
            content=content,
            content_type=content_type,
            object_id=created_data.id,
            creator_id=created_data.creator.id,
        )
        notification.save()
        notification.receivers.add(*tagged_users)
        send_push_notifications(notification)


def create_connection_request_notification(
    receiver: CustomUser,
    sender: CustomUser,
    is_requesting: bool,
) -> None:
    """
    A function that sends push notifications to a user when they receiver a connection request.
    """

    content_type = ContentType.objects.get_for_model(sender)
    content = f"{sender.preferred_name} sent you a connection request"
    if is_requesting:
        content = f"{sender.preferred_name} accepted your connection request"

    notification = Notification(
        content=content,
        content_type=content_type,
        object_id=sender.id,
        creator_id=sender.id,
    )
    notification.save()
    notification.receivers.add(receiver)
    send_push_notifications(notification)


def create_message_notification(
    receivers: QuerySet[CustomUser], sender: CustomUser, message: Message
) -> None:
    """
    A function that sends push notifications to a user when they receive a message.
    """

    if receivers.exists():
        content_type = ContentType.objects.get_for_model(message)
        content = f"{sender.preferred_name} sent you a message"
        notification = Notification(
            content=content,
            content_type=content_type,
            object_id=sender.id,
            creator_id=sender.id,
        )
        notification.save()
        notification.receivers.add(*receivers)
        send_push_notifications(notification)


def create_liked_shared_item_notification(
    liked_data: AbstractPostModel or Comment or Message or Reply, liker: CustomUser
) -> None:
    """
    A function that sends push notifications to the owner of a shared item when it is liked.
    """

    owner: CustomUser = liked_data.creator
    content_type = ContentType.objects.get_for_model(liked_data)
    content = f"{liker.preferred_name} liked your {content_type.model}!"
    notification = Notification.objects.create(
        content=content,
        content_type=content_type,
        object_id=liked_data.id,
        creator_id=liker.id,
    )
    notification.save()
    notification.receivers.add(owner)
    send_push_notifications(notification)


def create_event_reminder_notification(event: Event, attendee: CustomUser) -> None:
    """
    A function that sends push notifications to the owner of a shared item when it is liked.
    """
    content_type = ContentType.objects.get_for_model(event)
    content = f"Your event, {event.title}, starts in {attendee.event_reminder_preference} minutes!"
    notification = Notification.objects.create(
        content=content,
        content_type=content_type,
        object_id=event.id,
        creator_id=attendee.id,
    )
    notification.save()
    notification.receivers.add(attendee)
    send_push_notifications(notification)


def send_push_notifications(notification: Notification) -> None:
    """
    A function that sends push notifications to the receivers of a notification object.
    """

    push_messages: List[PushMessage] = []
    for receiver in notification.receivers.all():
        for device in receiver.devices.all():
            request = HttpRequest()
            request.user = notification.creator
            push_messages.append(
                PushMessage(
                    to=device.expo_push_token,
                    body=notification.content,
                    data=dict(
                        NotificationSerializer(
                            notification, context={"request": request}
                        ).data
                    ),
                )
            )

    if len(push_messages) > 0:
        PushClient().publish_multiple(push_messages)
