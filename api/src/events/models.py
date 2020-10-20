from django.db import models
from common.generics.generic_models import GenericPhotoCollection
from common.generics.generic_post_models import GenericPostModel, GenericCommentModel
from users.models import CustomUser
from datetime import datetime
from common.constants.choices import Choices


# Represents an event object
class Event(GenericPostModel, GenericPhotoCollection):
    price_scale = models.PositiveSmallIntegerField(choices=Choices.PRICE_CHOICES, default=0)
    start_datetime = models.DateTimeField(default=datetime.today)
    end_datetime = models.DateTimeField(blank=True, null=True)
    interested_users = models.ManyToManyField(to=CustomUser, related_name='interested_event_set', blank=True)
    attending_users = models.ManyToManyField(to=CustomUser, related_name='attending_event_set', blank=True)
    location = models.CharField(max_length=100, blank=True, default='123 Goose st, Waterloo, ON')


# Represents an event comment object
class EventComment(GenericCommentModel):
    event = models.ForeignKey(to=Event, related_name='comment_set', on_delete=models.CASCADE)
