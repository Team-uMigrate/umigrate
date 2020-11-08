from django.contrib.contenttypes.models import ContentType
from exponent_server_sdk import PushMessage
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
        tagged_notification = Notification(
            content=content,
            content_type=content_type,
            object_id=created_data.id,
            creator_id=created_data.creator.id,
        )
        tagged_notification.save()
        tagged_notification.receivers.add(*created_data.tagged_users.all())
