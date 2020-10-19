from django.db import models
from common.abstract_models import AbstractPostModel
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from common.constants.choices import Choices
from users.models import CustomUser


# Represents a comment object
class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.CharField(max_length=1000, blank=True)
    region = models.PositiveSmallIntegerField(choices=Choices.REGION_CHOICES)
    creator = models.ForeignKey(to=CustomUser, related_name="%(app_label)s_%(class)s_set", on_delete=models.CASCADE,
                                blank=True)
    datetime_created = models.DateTimeField(auto_now_add=True)
    liked_users = models.ManyToManyField(to=CustomUser, related_name="liked_%(app_label)s_%(class)s_set",
                                         blank=True)
    tagged_users = models.ManyToManyField(to=CustomUser, related_name="tagged_%(app_label)s_%(class)s_set",
                                          blank=True)
    saved_users = models.ManyToManyField(to=CustomUser, related_name="saved_%(app_label)s_%(class)s_set", blank=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    class Meta:
        ordering = ['-datetime_created']

    def __str__(self):
        return f'{self.content}'


# Represents a reply object
class Reply(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.CharField(max_length=1000, blank=True)
    region = models.PositiveSmallIntegerField(choices=Choices.REGION_CHOICES)
    creator = models.ForeignKey(to=CustomUser, related_name="%(app_label)s_%(class)s_set", on_delete=models.CASCADE,
                                blank=True)
    datetime_created = models.DateTimeField(auto_now_add=True)
    liked_users = models.ManyToManyField(to=CustomUser, related_name="liked_%(app_label)s_%(class)s_set",
                                         blank=True)
    tagged_users = models.ManyToManyField(to=CustomUser, related_name="tagged_%(app_label)s_%(class)s_set",
                                          blank=True)
    saved_users = models.ManyToManyField(to=CustomUser, related_name="saved_%(app_label)s_%(class)s_set", blank=True)
    comment = models.ForeignKey(to=Comment, related_name='reply_set', on_delete=models.CASCADE)

    class Meta:
        ordering = ['-datetime_created']

    def __str__(self):
        return f'{self.content}'
