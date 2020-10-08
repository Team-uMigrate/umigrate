from django.db import models
from common.generics.generic_models import GenericPhotoCollectionModel
from common.generics.generic_post_models import GenericPostModel, GenericCommentModel
from common.constants.choices import Choices


# Represents a listing object
class Listing(GenericPostModel, GenericPhotoCollectionModel):
    photo = models.ImageField(upload_to='images/listing_photos', blank=True)
    category = models.PositiveSmallIntegerField(choices=Choices.LISTING_CATEGORY_CHOICES)
    price = models.DecimalField(max_digits=9, decimal_places=2)
    season = models.PositiveSmallIntegerField(choices=Choices.SEASON_CHOICES)
    year = models.PositiveSmallIntegerField()
    location = models.CharField(max_length=100)


# Represents a listing comment object
class ListingComment(GenericCommentModel):
    listing = models.ForeignKey(to=Listing, related_name='comment_set', on_delete=models.CASCADE)
