from django.db import models
from common.abstract_models import AbstractPostModel
from common.model_extensions import PhotoCollectionExtension
from users.models import CustomUser


# Represents a poll object
class Poll(AbstractPostModel, PhotoCollectionExtension):
    is_multiselect = models.BooleanField(default=False)
    is_public = models.BooleanField(default=False)


# Represents an option object
class Option(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.CharField(max_length=100)
    creator = models.ForeignKey(
        to=CustomUser,
        related_name="created_options",
        on_delete=models.CASCADE,
        blank=True,
    )
    datetime_created = models.DateTimeField(auto_now_add=True)
    poll = models.ForeignKey(to=Poll, related_name="options", on_delete=models.CASCADE)

    class Meta:
        ordering = ["-datetime_created"]

    def __str__(self):
        return f"{self.content}"


# Represents a vote object
class Vote(models.Model):
    id = models.AutoField(primary_key=True)
    creator = models.ForeignKey(
        to=CustomUser,
        related_name="created_votes",
        on_delete=models.CASCADE,
        blank=True,
    )
    datetime_created = models.DateTimeField(auto_now_add=True)
    option = models.ForeignKey(
        to=Option, related_name="votes", on_delete=models.CASCADE
    )

    class Meta:
        ordering = ["-datetime_created"]

    def __str__(self):
        return f"{str(self.creator)} voted for {str(self.option)} in {str(self.option.poll)}"
