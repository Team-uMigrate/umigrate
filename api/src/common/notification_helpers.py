from django.contrib.contenttypes.models import ContentType
from exponent_server_sdk import PushMessage, PushClient
from comments.models import Comment, Reply
from common.abstract_models import AbstractPostModel
from messaging.models import Message
from notifications.models import Notification
from notifications.serializers import NotificationSerializer


def create_tagged_user_notification(
    created_data: AbstractPostModel or Comment or Message or Reply,
) -> None:
    if created_data.tagged_users.count() > 0:
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
        notification.receivers.add(*created_data.tagged_users.all())
        send_push_notifications(notification)


def send_push_notifications(notification: Notification) -> None:
    push_messages = []
    for receiver in notification.receivers.all():
        for device in receiver.device_set.all():
            push_messages.append(
                PushMessage(
                    to=device.expo_push_token,
                    body=notification.content,
                    data=dict(NotificationSerializer(notification).data),
                )
            )

    PushClient().publish_multiple(push_messages)
