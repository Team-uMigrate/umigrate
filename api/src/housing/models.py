from django.db import models
from common.generics.generic_post_models import GenericPostModel, GenericCommentModel
from common.generics.generic_models import GenericPhotoModel
from common.constants.choices import Choices


# Represents a housing object
class Housing(GenericPostModel, GenericPhotoModel):
    photo = models.ImageField(upload_to='images/housing_photos', blank=True)
    category = models.PositiveSmallIntegerField(choices=Choices.AD_CATEGORY_CHOICES)
    features = models.CharField(max_length=500, blank=True)
    price = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)
    street_address = models.CharField(max_length=30, blank=True)
    city = models.CharField(max_length=30, blank=True)
    division = models.CharField(max_length=30, blank=True)
    country = models.CharField(max_length=30, blank=True)
    term = models.PositiveSmallIntegerField(choices=Choices.TERM_CHOICES)


# Represents a housing comment object
class HousingComment(GenericCommentModel):
    housing = models.ForeignKey(to=Housing, related_name='comment_set', on_delete=models.CASCADE)