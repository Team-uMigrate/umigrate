import factory
from common.abstract_factories import AbstractFactory
from .models import Listing
from common.constants.choices import Choices, get_length


class ListingFactory(AbstractFactory):
    class Meta:
        model = Listing

    category = factory.Faker(
        "random_int", min=0, max=get_length(Choices.LISTING_CATEGORY_CHOICES) - 1
    )
    price = factory.Faker("pydecimal", left_digits=6, right_digits=2)
    season = factory.Faker(
        "random_int", min=0, max=get_length(Choices.SEASON_CHOICES) - 1
    )
    year = factory.Faker("random_int", min=2000, max=2050)
    location = factory.Faker("address")
