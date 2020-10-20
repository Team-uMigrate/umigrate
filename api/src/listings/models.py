from django.db import models
from common.generics.generic_models import GenericPhotoCollection
from common.generics.generic_post_models import GenericPostModel, GenericCommentModel
from common.constants.choices import Choices


# Represents a listing object
class Listing(GenericPostModel, GenericPhotoCollection):
    category = models.PositiveSmallIntegerField(choices=Choices.LISTING_CATEGORY_CHOICES, default=0)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0.0)
    season = models.PositiveSmallIntegerField(choices=Choices.SEASON_CHOICES, default=0)
    year = models.PositiveSmallIntegerField(default=2020)
    location = models.CharField(max_length=100, default='123 Goose st, Waterloo, ON')


# Represents a listing comment object
class ListingComment(GenericCommentModel):
    listing = models.ForeignKey(to=Listing, related_name='comment_set', on_delete=models.CASCADE)
