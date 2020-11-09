from datetime import datetime

import requests
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _

from common.abstract_models import AbstractPostModel
from common.constants.choices import Choices
from common.model_extensions import PhotoCollectionExtension
from users.models import CustomUser


# Represents an event object
class Event(AbstractPostModel, PhotoCollectionExtension):
    price_scale = models.PositiveSmallIntegerField(
        choices=Choices.PRICE_CHOICES, default=0
    )
    start_datetime = models.DateTimeField(default=datetime.today)
    end_datetime = models.DateTimeField(blank=True, null=True)
    interested_users = models.ManyToManyField(
        to=CustomUser, related_name="interested_event_set", blank=True
    )
    attending_users = models.ManyToManyField(
        to=CustomUser, related_name="attending_event_set", blank=True
    )
    location = models.CharField(
        max_length=100, blank=True, default="123 Goose st, Waterloo, ON"
    )

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    # Validation for start & end dates, and location of event
    def clean(self):
        location_validation = requests.get(
            f"https://api.mapbox.com/geocoding/v5/mapbox.places/{self.location}.json?types=address&access_token=pk.eyJ1IjoidGhld3JpbmdlcjEiLCJhIjoiY2tnbzZ5bDBzMGd6cTJxcWxyeWpodGU3ZiJ9.RxtcDwyq-m7_t9sWwqQqfg"
        )
        location_check = location_validation.json()["features"]
        if self.start_datetime is None:
            raise ValidationError({"start_datetime": _("Start Date cannot be null")})
        if self.start_datetime > self.end_datetime:
            raise ValidationError({"end_datetime": _("End date before start date")})
        if not location_check:
            raise ValidationError({"location": _("Invalid location")})
