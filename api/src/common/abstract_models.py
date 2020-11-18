from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from comments.models import Comment
from users.models import CustomUser
from common.constants.choices import Choices
from rest_framework.permissions import BasePermission, SAFE_METHODS


# A custom permission that only allows the creator of a resource to modify or delete it
class IsCreatorOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.creator_id == request.user.id


# A custom permission that only allows the creator of a resource to access it
class IsCreator(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.creator_id == request.user.id


# An abstract model that represents a basic post
class AbstractPostModel(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=1000, blank=True)
    region = models.PositiveSmallIntegerField(choices=Choices.REGION_CHOICES)
    creator = models.ForeignKey(
        to=CustomUser,
        related_name="(class)s_set",
        on_delete=models.CASCADE,
        blank=True,
    )
    datetime_created = models.DateTimeField(auto_now_add=True)
    liked_users = models.ManyToManyField(
        to=CustomUser, related_name="liked_(class)s_set", blank=True
    )
    tagged_users = models.ManyToManyField(
        to=CustomUser, related_name="tagged_(class)s_set", blank=True
    )
    saved_users = models.ManyToManyField(
        to=CustomUser, related_name="saved_(class)s_set", blank=True
    )
    comments = GenericRelation(Comment)

    class Meta:
        abstract = True
        ordering = ["-datetime_created"]

    def __str__(self):
        return f"{self.title}"
