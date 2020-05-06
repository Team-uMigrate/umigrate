from django.db import models
from users.models import CustomUser
from common.constants.choices import Choices
from rest_framework.permissions import BasePermission, SAFE_METHODS


# A custom permission that only allows the creator of a resource to modify or delete it
class IsCreatorOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        if request.method in SAFE_METHODS:
            return True

        # Write permissions are only allowed to the creator of the object.
        return obj.creator_id == request.user.id


# An abstract model that represents a generic post object
class GenericPostModel(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500, blank=True)
    region = models.PositiveSmallIntegerField(choices=Choices.REGION_CHOICES)
    creator = models.ForeignKey(to=CustomUser, related_name="%(app_label)s_%(class)s_set", on_delete=models.CASCADE)
    datetime_created = models.DateTimeField(auto_now_add=True)
    liked_users = models.ManyToManyField(to=CustomUser, related_name="liked_%(app_label)s_%(class)s_comment_set", blank=True)
    tagged_users = models.ManyToManyField(to=CustomUser, related_name="tagged_%(app_label)s_%(class)s_comment_set", blank=True)

    class Meta:
        abstract = True
        ordering = ['-datetime_created']

    def __str__(self):
        return f'{self.title}'


# An abstract model that represents a generic comment object
class GenericCommentModel(models.Model):
    id = models.AutoField(primary_key=True)
    comment_body = models.TextField(max_length=1000)
    creator = models.ForeignKey(to=CustomUser, related_name="%(app_label)s_%(class)s_comment_set", on_delete=models.CASCADE)
    datetime_created = models.DateTimeField(auto_now_add=True)
    liked_users = models.ManyToManyField(to=CustomUser, related_name="liked_%(app_label)s_%(class)s_comment_set", blank=True)
    tagged_users = models.ManyToManyField(to=CustomUser, related_name="tagged_%(app_label)s_%(class)s_comment_set", blank=True)

    class Meta:
        ordering = ['-datetime_created']
        abstract = True

    def __str__(self):
        return f'{self.comment_body}'
