from django.db import models
from common.abstract_models import AbstractPostModel
from common.model_extensions import PhotoCollectionExtension
from common.constants.choices import Choices
from users.models import CustomUser


class Listing(AbstractPostModel, PhotoCollectionExtension):
    """
    A model class that represents a listing.
    """

    category = models.PositiveSmallIntegerField(
        choices=Choices.LISTING_CATEGORY_CHOICES, default=0
    )
    location = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0.0)
    season = models.PositiveSmallIntegerField(choices=Choices.SEASON_CHOICES, default=0)
    year = models.PositiveSmallIntegerField(default=2020)
    quantity = models.PositiveSmallIntegerField(default=0)
    contacted_users = models.ManyToManyField(
        to=CustomUser, related_name="contacted_listings", blank=True
    )
    confirmed_users = models.ManyToManyField(
        to=CustomUser, related_name="confirmed_listings", blank=True
    )


class RoommatePost(AbstractPostModel, PhotoCollectionExtension):
    """
    A model class that represents a roommate post.
    """

    quantity = models.PositiveSmallIntegerField(default=0)
    contacted_users = models.ManyToManyField(
        to=CustomUser, related_name="contacted_roommate_posts", blank=True
    )
    confirmed_users = models.ManyToManyField(
        to=CustomUser, related_name="confirmed_roommate_posts", blank=True
    )
