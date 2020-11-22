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
class Room(GenericPhotoModel):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    datetime_created = models.DateTimeField(auto_now_add=True)
    members = models.ManyToManyField(to=CustomUser, related_name="room_set", blank=True)

    class Meta:
        ordering = ["-datetime_created"]

    def __str__(self):
        return f"{self.title}"


# Represents a message object
class Message(GenericPhotoModel):
    id = models.AutoField(primary_key=True)
    content = models.CharField(max_length=500)
    creator = models.ForeignKey(
        to=CustomUser,
        related_name="message_created_set",
        on_delete=models.CASCADE,
        blank=True,
    )
    datetime_created = models.DateTimeField(auto_now_add=True)
    liked_users = models.ManyToManyField(
        to=CustomUser,
        related_name="liked_message_set",
        blank=True,
    )
    tagged_users = models.ManyToManyField(
        to=CustomUser,
        related_name="tagged_message_set",
        blank=True,
    )
    profile_photo = models.ImageField(
        upload_to="images/message_profile_photos", blank=True
    )
    background_photo = models.ImageField(
        upload_to="images/message_background_photos", blank=True
    )
    room = models.ForeignKey(
        to=Room, related_name="message_set", on_delete=models.CASCADE
    )
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
