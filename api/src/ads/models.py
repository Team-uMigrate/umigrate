from django.db import models
from common.model_extensions import PhotoCollectionExtension
from common.abstract_models import AbstractPostModel
from common.constants.choices import Choices
from users.models import CustomUser


# A model class that represents an ad
class Ad(AbstractPostModel, PhotoCollectionExtension):
    is_service = models.BooleanField(default=False)
    is_buying = models.BooleanField(default=False)
    category = models.PositiveSmallIntegerField(
        choices=Choices.AD_CATEGORY_CHOICES, default=0
    )
    postal_code = models.CharField(max_length=6, blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0.0)
    quantity = models.PositiveSmallIntegerField(default=0)
    contacted_users = models.ManyToManyField(
        to=CustomUser, related_name="contacted_ads", blank=True
    )
    confirmed_users = models.ManyToManyField(
        to=CustomUser, related_name="confirmed_ads", blank=True
    )
