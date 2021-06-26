import random
import factory
from django.db.models import QuerySet
from common.abstract_factories import AbstractFactory
from common.constants.choices import Choices, get_length, MockData
from users.factories import UserFactory
from .models import Event


class EventFactory(AbstractFactory):
    class Meta:
        model = Event

    start_datetime = factory.Faker(
        "date_time_between", start_date="-30y", end_date="now"
    )
    end_datetime = factory.Faker("date_time_between", start_date="now", end_date="+30y")
    location = factory.lazy_attribute(
        lambda a: MockData.MOCK_ADDRESSES[
            random.randint(0, len(MockData.MOCK_ADDRESSES) - 1)
        ]
    )
    price = factory.Faker("pydecimal", left_digits=6, right_digits=2)
    price_scale = factory.Faker(
        "random_int", min=0, max=get_length(Choices.PRICE_CHOICES) - 1
    )

    @factory.post_generation
    def interested_users(self, create, extracted, **kwargs):
        if create:
            if isinstance(extracted, (list, QuerySet)):
                for user in extracted:
                    self.interested_users.add(user)
            else:
                rand_int = random.randint(0, 2)
                for i in range(rand_int):
                    self.interested_users.add(
                        UserFactory(connected_users=[], blocked_users=[])
                    )

    @factory.post_generation
    def attending_users(self, create, extracted, **kwargs):
        if create:
            if isinstance(extracted, (list, QuerySet)):
                for user in extracted:
                    self.attending_users.add(user)
            else:
                rand_int = random.randint(0, 2)
                for i in range(rand_int):
                    self.attending_users.add(
                        UserFactory(connected_users=[], blocked_users=[])
                    )
