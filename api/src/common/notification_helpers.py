from types import SimpleNamespace
from typing import List
from users.models import CustomUser
from django.contrib.contenttypes.models import ContentType
from django.db.models.query import QuerySet
from exponent_server_sdk import PushMessage, PushClient
from comments.models import Comment, Reply
from common.abstract_models import AbstractPostModel
from messaging.models import Message
from notifications.models import Notification
from notifications.serializers import NotificationSerializer


# A function that sends push notifications to all tagged users for a shared item
def create_tagged_user_notification(
    created_data: AbstractPostModel or Comment or Message or Reply,
) -> None:
    tagged_users = created_data.tagged_users.all()
    if len(tagged_users) > 0:
        content_type = ContentType.objects.get_for_model(created_data)
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


# A function that sends push notifications to a user when they recieve a connection request
def create_connection_request_notification(
    reciever: CustomUser,
    sender: CustomUser,
    is_request: bool,  # request => true if requesting, false if accepting
) -> None:
    content_type = ContentType.objects.get_for_model(sender)
    content = f"{sender.preferred_name} sent you a connection request"
    if is_request:
        content = f"{sender.preferred_name} accepted your connection request"

    notification = Notification(
        content=content,
        content_type=content_type,
        object_id=sender.id,
        creator_id=sender.id,
    )
    notification.save()
    notification.receivers.add(reciever)
    send_push_notifications(notification)


# A function that sends push notifications to a user when they receive a message
def create_message_notification(
    receivers: QuerySet[CustomUser], sender: CustomUser, message: Message
) -> None:
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


# A function that sends push notifications to the owner of a shared item when it is liked
def create_liked_shared_item_notification(
    liked_data: AbstractPostModel or Comment or Message or Reply, liker: CustomUser
) -> None:
    owner = liked_data.creator
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


# A function that sends push notifications to the receivers of a notification object
def send_push_notifications(notification: Notification) -> None:
    push_messages = []
    request = SimpleNamespace()
    request.user = notification.creator
    for receiver in notification.receivers.all():
        for device in receiver.devices.all():
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

    PushClient().publish_multiple(push_messages)
