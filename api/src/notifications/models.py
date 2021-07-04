from django.db import models
from users.models import CustomUser
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.conf import settings


class Notification(models.Model):
    """
    A model class that represents a notification.
    """

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
    notification_type = models.CharField(
        choices=settings.NOTIFICATION_CHOICES, default=settings.LIKES_FIELD, max_length=max([len(notification_type[0]) for notification_type in settings.NOTIFICATION_CHOICES])
    )

    class Meta:
        ordering = ["-datetime_created"]

    def __str__(self):
        return f"{self.content}"


class Device(models.Model):
    """
    A model class that represents a device.
    """

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
