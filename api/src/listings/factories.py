import factory
from common.abstract_factories import AbstractFactory
from .models import Listing
from common.constants.choices import Choices, get_length
from users.factories import UserFactory
import random
from django.db.models.query import QuerySet


class ListingFactory(AbstractFactory):
    class Meta:
        model = Listing

    category = factory.Faker(
        "random_int", min=0, max=get_length(Choices.LISTING_CATEGORY_CHOICES) - 1
    )
    location = factory.Faker("address")
    price = factory.Faker("pydecimal", left_digits=6, right_digits=2)
    season = factory.Faker(
        "random_int", min=0, max=get_length(Choices.SEASON_CHOICES) - 1
    )
    year = factory.Faker("random_int", min=2000, max=2050)

    @factory.post_generation
    def contacted_users(self, create, extracted, **kwargs):
        if create:
            if isinstance(extracted, (list, QuerySet)):
                for user in extracted:
                    self.contacted_users.add(user)
            else:
                rand_int = random.randint(0, 2)
                for i in range(rand_int):
                    self.contacted_users.add(
                        UserFactory(connected_users=[], blocked_users=[])
                    )

    @factory.post_generation
    def confirmed_users(self, create, extracted, **kwargs):
        if create:
            if isinstance(extracted, (list, QuerySet)):
                for user in extracted:
                    self.confirmed_users.add(user)
            else:
                rand_int = random.randint(0, 2)
                for i in range(rand_int):
                    self.confirmed_users.add(
                        UserFactory(connected_users=[], blocked_users=[])
                    )
