from django.db import models
from users.models import CustomUser


class Notification(models.Model):
    id = models.AutoField(primary_key=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")
    datetime_created = models.DateTimeField(auto_now_add=True)
    recievers = models.ManyToManyField(
        to=CustomUser, related_name="received_notification_set", blank=True
    )
    viewers - models.ManyToManyField(
        to=CustomUser, related_name="viewed_notification_set"
    )

