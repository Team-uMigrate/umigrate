import factory
from common.abstract_factories import AbstractFactory
from .models import Ad
from common.constants.choices import Choices, get_length
from string import ascii_uppercase
from users.factories import UserFactory
import random
from django.db.models.query import QuerySet


class AdFactory(AbstractFactory):
    class Meta:
        model = Ad

    is_service = factory.Faker("boolean")
    is_buying = factory.Faker("boolean")
    category = factory.Faker(
        "random_int", min=0, max=get_length(Choices.AD_CATEGORY_CHOICES) - 1
    )
    postal_code = factory.Faker("bothify", text="?#?#?#", letters=ascii_uppercase)
    price = factory.Faker("pydecimal", left_digits=6, right_digits=2)
    quantity = factory.Faker("random_int")

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
