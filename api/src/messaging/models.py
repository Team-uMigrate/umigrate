from django.db import models
from rest_framework.permissions import BasePermission
from users.models import CustomUser


# A model class that represents a room
class Room(models.Model):
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


# A model class that allows for storing of a users join date and time
class Membership(models.Model):
    member = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    date_joined = models.DateTimeField(auto_now_add=True)


# A model class that represents a message
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


# A permission class that only allows members of a room to access it
class IsMember(BasePermission):
    def has_object_permission(self, request, view, obj: Room):
        return obj.members.filter(id=request.user.id).exists()
