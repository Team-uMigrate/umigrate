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
        related_name="created_notifications",
        on_delete=models.CASCADE,
        blank=True,
    )
    datetime_created = models.DateTimeField(auto_now_add=True)
    receivers = models.ManyToManyField(
        to=CustomUser, related_name="received_notifications", blank=True
    )
    viewers = models.ManyToManyField(
        to=CustomUser, related_name="viewed_notifications", blank=True
    )

    class Meta:
        ordering = ["-datetime_created"]

    def __str__(self):
        return f"{self.content}"


class Device(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    expo_push_token = models.CharField(max_length=50)
    creator = models.ForeignKey(
        to=CustomUser, related_name="devices", on_delete=models.CASCADE, blank=True
    )
    datetime_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-datetime_created"]

    def __str__(self):
        return f"{self.name}"
