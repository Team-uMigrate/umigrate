from django.db import models
from common.generics.generic_post_models import GenericPostModel, GenericCommentModel
from common.generics.generic_models import GenericPhotoModel
from common.constants.choices import Choices


# Represents an ad object
class Ad(GenericPostModel, GenericPhotoModel):
    photo = models.ImageField(upload_to='images/ad_photos', blank=True)
    category = models.PositiveSmallIntegerField(choices=Choices.AD_CATEGORY_CHOICES)
    features = models.CharField(max_length=500, blank=True)
    price = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)


# Represents an ad comment object
class AdComment(GenericCommentModel):
    posting_type = 'ad'
    ad = models.ForeignKey(to=Ad, related_name='comment_set', on_delete=models.CASCADE)
