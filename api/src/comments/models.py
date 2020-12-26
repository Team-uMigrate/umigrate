from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from users.models import CustomUser


# A model class that represents a comment
class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.CharField(max_length=1000)
    creator = models.ForeignKey(
        to=CustomUser,
        related_name="created_comments",
        on_delete=models.CASCADE,
        blank=True,
    )
    datetime_created = models.DateTimeField(auto_now_add=True)
    liked_users = models.ManyToManyField(
        to=CustomUser, related_name="liked_comments", blank=True
    )
    tagged_users = models.ManyToManyField(
        to=CustomUser, related_name="tagged_comments", blank=True
    )
    saved_users = models.ManyToManyField(
        to=CustomUser, related_name="saved_comments", blank=True
    )
    # Todo: Fix cascading delete
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")

    class Meta:
        ordering = ["-datetime_created"]

    def __str__(self):
        return f"{self.content}"


# A model class that represents a reply
class Reply(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.CharField(max_length=1000)
    creator = models.ForeignKey(
        to=CustomUser,
        related_name="created_replies",
        on_delete=models.CASCADE,
        blank=True,
    )
    datetime_created = models.DateTimeField(auto_now_add=True)
    liked_users = models.ManyToManyField(
        to=CustomUser, related_name="liked_replies", blank=True
    )
    tagged_users = models.ManyToManyField(
        to=CustomUser, related_name="tagged_replies", blank=True
    )
    saved_users = models.ManyToManyField(
        to=CustomUser, related_name="saved_replies", blank=True
    )
    comment = models.ForeignKey(
        to=Comment, related_name="replies", on_delete=models.CASCADE
    )

    class Meta:
        ordering = ["-datetime_created"]

    def __str__(self):
        return f"{self.content}"
