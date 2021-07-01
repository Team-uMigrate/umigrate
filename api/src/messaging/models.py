from django.db import models
from rest_framework.permissions import BasePermission
from users.models import CustomUser
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.db.models.signals import pre_delete
from django.dispatch import receiver


class Room(models.Model):
    """
    A model class that represents a room.
    """

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    datetime_created = models.DateTimeField(auto_now_add=True)
    members = models.ManyToManyField(
        to=CustomUser,
        related_name="rooms",
        blank=True,
        through="Membership",
    )

    class Meta:
        ordering = ["-datetime_created"]

    def __str__(self):
        return f"{self.title}"

    def save(self, *args, **kwargs):
        if self.id and not self.members:
            self.delete()
        else:
            super().save(*args, **kwargs)


class Membership(models.Model):
    """
    A model class that represents a membership of a room for a user.
    """

    member = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    date_joined = models.DateTimeField(auto_now_add=True)


class Message(models.Model):
    """
    A model class that represents a message.
    """

    id = models.AutoField(primary_key=True)
    content = models.CharField(max_length=1000)
    creator = models.ForeignKey(
        to=CustomUser,
        related_name="created_messages",
        on_delete=models.CASCADE,
        blank=True,
    )
    datetime_created = models.DateTimeField(auto_now_add=True)
    liked_users = models.ManyToManyField(
        to=CustomUser,
        related_name="liked_messages",
        blank=True,
    )
    tagged_users = models.ManyToManyField(
        to=CustomUser,
        related_name="tagged_messages",
        blank=True,
    )
    room = models.ForeignKey(to=Room, related_name="messages", on_delete=models.CASCADE)
    previous_message = models.ForeignKey(
        to="self",
        related_name="replies",
        on_delete=models.DO_NOTHING,
        blank=True,
        null=True,
    )
    content_type = models.ForeignKey(
        to=ContentType, on_delete=models.SET_NULL, null=True, blank=True
    )
    object_id = models.PositiveIntegerField(blank=True, null=True)
    content_object = GenericForeignKey("content_type", "object_id")

    class Meta:
        ordering = ["-datetime_created"]

    def __str__(self):
        return f"{self.content}"


class IsMember(BasePermission):
    """
    A permission class that only allows members of a room to access it.
    """

    def has_object_permission(self, request, view, obj: Room):
        return obj.members.filter(id=request.user.id).exists()


@receiver(pre_delete)
def ondelete_shared_item(sender, instance, using, **kwargs):
    """
    When a shared item is deleted, find any references of that shared item in a message and set that field to null.
    """

    content_type = ContentType.objects.get_for_model(sender)
    res = Message.objects.filter(content_type=content_type)
    # avoid filtering on null records when a shared item isn't referenced in any message.
    if res.count() > 0:
        res.filter(object_id=instance.id).update(content_type=None, object_id=None)
