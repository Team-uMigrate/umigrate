from django.db import models
from common.generics.generic_models import GenericPhotoCollection
from common.abstract_models import AbstractPostModel
from common.constants.choices import Choices


# Represents an ad object
class Ad(AbstractPostModel, GenericPhotoCollection):
    category = models.PositiveSmallIntegerField(choices=Choices.AD_CATEGORY_CHOICES, default=0)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0.0)
    postal_code = models.CharField(max_length=6, default='A1B2C3')
