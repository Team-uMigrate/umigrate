from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from comments.models import Comment
from users.models import CustomUser
from common.constants.choices import Choices
from rest_framework.permissions import BasePermission, SAFE_METHODS


# An abstract model class that represents a basic post
class AbstractPostModel(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=1000, blank=True)
    creator = models.ForeignKey(
        to=CustomUser,
        related_name="created_%(class)ss",
        on_delete=models.CASCADE,
        blank=True,
    )
    datetime_created = models.DateTimeField(auto_now_add=True)
    community = models.PositiveSmallIntegerField(choices=Choices.COMMUNITY_CHOICES)
    tagged_users = models.ManyToManyField(
        to=CustomUser, related_name="tagged_%(class)ss", blank=True
    )
    liked_users = models.ManyToManyField(
        to=CustomUser, related_name="liked_%(class)ss", blank=True
    )
    saved_users = models.ManyToManyField(
        to=CustomUser, related_name="saved_%(class)ss", blank=True
    )
    comments = GenericRelation(Comment)

    class Meta:
        abstract = True
        ordering = ["-datetime_created"]

    def __str__(self):
        return f"{self.title}"


# A permission class that only allows the creator of a shared item to modify or delete it
class IsCreatorOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj: AbstractPostModel):
        if request.method in SAFE_METHODS:
            return True

        return obj.creator_id == request.user.id


# A permission class that only allows the creator of a shared item to access it
class IsCreator(BasePermission):
    def has_object_permission(self, request, view, obj: AbstractPostModel):
        return obj.creator_id == request.user.id
