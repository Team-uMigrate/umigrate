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


# A model class that represents an event
class Event(AbstractPostModel, PhotoCollectionExtension):
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
