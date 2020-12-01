from django.db import models
from rest_framework.permissions import BasePermission, SAFE_METHODS
from users.models import CustomUser
from common.model_extensions import GenericPhotoModel
from common.constants.choices import Choices


# A custom permission that only allows members of a room to view a private room and allows the creator to modify or
# delete it
class IsCreatorOrMemberReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            if obj.members.filter(id=request.user.id):
                return True

        return obj.creator_id == request.user.id


# Represents a room object
class Room(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    datetime_created = models.DateTimeField(auto_now_add=True)
    members = models.ManyToManyField(to=CustomUser, related_name="rooms", blank=True)

    class Meta:
        ordering = ["-datetime_created"]

    def __str__(self):
        return f"{self.title}"

    def save(self, *args, **kwargs):
        if self.id and not self.members:
            self.delete()
        else:
            super().save(*args, **kwargs)


# Represents a message object
class Message(models.Model):
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

    class Meta:
        ordering = ["-datetime_created"]

    def __str__(self):
        return f"{self.content}"
