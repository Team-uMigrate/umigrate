from django.db import models
from comments.models import Comment
from common.abstract_models import AbstractPostModel
from messaging.models import Message
from users.models import CustomUser
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class Notification(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.CharField(max_length=100)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")
    creator = models.ForeignKey(
        to=CustomUser,
        related_name="created_notification_set",
        on_delete=models.CASCADE,
        blank=True,
    )
    datetime_created = models.DateTimeField(auto_now_add=True)
    receivers = models.ManyToManyField(
        to=CustomUser, related_name="received_notification_set", blank=True
    )
    viewers = models.ManyToManyField(
        to=CustomUser, related_name="viewed_notification_set", blank=True
    )

    class Meta:
        ordering = ["-datetime_created"]

    def __str__(self):
        return f"{self.content}"


def create_tagged_user_notification(
    created_data: AbstractPostModel or Comment or Message,
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


class Device(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    creator = models.ForeignKey(
        to=CustomUser, related_name="device_set", on_delete=models.CASCADE, blank=True
    )
    expo_push_token = models.CharField(max_length=50)
    datetime_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-datetime_created"]

    def __str__(self):
        return f"{self.name}"
