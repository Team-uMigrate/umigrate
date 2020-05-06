from django.db import models
from common.generics.generic_post_models import GenericPostModel, GenericCommentModel
from common.generics.generic_models import GenericPhotoModel
from users.models import CustomUser


# Represents a poll object
class Poll(GenericPostModel, GenericPhotoModel):
    photo = models.ImageField(upload_to='images/poll_photos', blank=True)


# Represents a poll comment object
class PollComment(GenericCommentModel):
    poll = models.ForeignKey(to=Poll, related_name='comment_set', on_delete=models.CASCADE)


# Represents an option object
class Option(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=30)
    datetime_created = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(to=CustomUser, related_name='option_set', on_delete=models.CASCADE)
    poll = models.ForeignKey(to=Poll, related_name='option_set', on_delete=models.CASCADE)

    class Meta:
        ordering = ['-datetime_created']

    def __str__(self):
        return f'{self.description}'


# Represents a vote object
class Vote(models.Model):
    id = models.AutoField(primary_key=True)
    datetime_created = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(to=CustomUser, related_name='vote_set', on_delete=models.CASCADE)
    option = models.ForeignKey(to=Option, related_name='vote_set', on_delete=models.CASCADE)

    class Meta:
        ordering = ['-datetime_created']

    def __str__(self):
        return f"{str(self.creator)}'s vote"
