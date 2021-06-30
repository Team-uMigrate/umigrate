from typing import List
import requests
from datetime import datetime
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _
from common.abstract_models import AbstractPostModel
from common.constants.choices import Choices
from common.model_extensions import PhotoCollectionExtension
from users.models import CustomUser
from django.conf import settings
from channels.db import database_sync_to_async
from common.notification_helpers import event_reminder_notfication

class Event(AbstractPostModel, PhotoCollectionExtension):
    """
    A model class that represents an event.
    """

    start_datetime = models.DateTimeField(default=datetime.today)
    end_datetime = models.DateTimeField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0.0, blank=True)
    price_scale = models.PositiveSmallIntegerField(
        choices=Choices.PRICE_CHOICES, default=0, blank=True
    )
    interested_users = models.ManyToManyField(
        to=CustomUser, related_name="interested_events", blank=True
    )
    attending_users = models.ManyToManyField(
        to=CustomUser, related_name="attending_events", blank=True
    )

    def save(self, *args, **kwargs):
        '''
            Enqueue messages for event reminder functions:
            1) When an event is created, schedule 4 messages
            or as many messages as the number of unique event notification preferences
            2) Schedule an event for all those times with the event id
        '''
        scheduler = django_rq.get_scheduler(settings.SCHEDULER_QUEUE)
        job = scheduler.enqueue_at(datetime(2020, 10, 10), event_reminder_generator, self.id)
        print(job)
        self.clean()
        super().save(*args, **kwargs)

    def clean(self):
        # Validate that location exists
        if not (self.location is None or self.location == ""):
            location_validation = requests.get(
                f"https://api.mapbox.com/geocoding/v5/mapbox.places/{self.location}.json?types=address&access_token="
                + f"pk.eyJ1IjoidGhld3JpbmdlcjEiLCJhIjoiY2tnbzZ5bDBzMGd6cTJxcWxyeWpodGU3ZiJ9.RxtcDwyq-m7_t9sWwqQqfg"
            )
            location_check: List[dict] = location_validation.json()["features"]
            if not location_check:
                raise ValidationError({"location": _("Invalid location")})

        # Validate start date and time
        if not self.start_datetime:
            raise ValidationError({"start_datetime": _("Start Date cannot be null")})

        # Validate end date and time
        if self.start_datetime > self.end_datetime:
            raise ValidationError({"end_datetime": _("End date before start date")})


async def event_reminder_generator(event_id : int):
    '''
    Expected: We receieve information about what even this reminder is for
    Note: eveything is in UTC time
    # check for extraneous inputs where the event time may have changed, etc...
    1) using the scheduled time of the event, find what type of event it is (ie: what type of notification we are sending out, notification at 15 min interval, 30...)
    2) find which users are attending this type of an event
    3) to all the users attending the event, create a notification (tbd) and send it out
    '''
    event = Event.objects.filter(id=event_id)
    if event.count() > 0:
        notification_time = event.startdatetime - datetime.utcnow()
        print(notification_time)
        notifying_users = event.attending_users.objects.filter(preferences=notification_time)
        await database_sync_to_async(
            lambda: event_reminder_notfication(
                notifying_users, event
            )
        )()
    else:
        raise ValueError(f"The event with id {event_id} does not exist; the event must have been cancelled or deleted")