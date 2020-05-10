from django.db import models
from common.generics.generic_post_models import GenericPostModel, GenericCommentModel
from common.generics.generic_models import GenericPhotoModel
from users.models import CustomUser
from datetime import datetime


# Represents an event object
class Event(GenericPostModel, GenericPhotoModel):
    photo = models.ImageField(upload_to='images/event_photos', blank=True)
    price = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)
    start_datetime = models.DateTimeField(default=datetime.today)
    end_datetime = models.DateTimeField(blank=True, null=True)
    interested_users = models.ManyToManyField(to=CustomUser, related_name='interested_event_set', blank=True)
    attending_users = models.ManyToManyField(to=CustomUser, related_name='attending_event_set', blank=True)
    street_address = models.CharField(max_length=30, blank=True)
    city = models.CharField(max_length=30, blank=True)
    division = models.CharField(max_length=30, blank=True)
    country = models.CharField(max_length=30, blank=True)


# Represents an event comment object
class EventComment(GenericCommentModel):
    event = models.ForeignKey(to=Event, related_name='comment_set', on_delete=models.CASCADE)
