from django.db import models
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
