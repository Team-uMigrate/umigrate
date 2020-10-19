import factory
from common.generics.generic_factories import GenericPostFactory, GenericCommentFactory
from .models import Listing, ListingComment
from common.constants.choices import Choices, get_length


class ListingFactory(GenericPostFactory):
    class Meta:
        model = Listing

    category = factory.Faker('random_int', min=0, max=get_length(Choices.LISTING_CATEGORY_CHOICES)-1)
    price = factory.Faker('pydecimal', left_digits=6, right_digits=2)
    season = factory.Faker('random_int', min=0, max=get_length(Choices.SEASON_CHOICES)-1)
    year = factory.Faker('random_int', min=2000, max=2050)
    location = factory.Faker('address')


class ListingCommentFactory(GenericCommentFactory):
    class Meta:
        model = ListingComment

    listing = factory.SubFactory(ListingFactory)
