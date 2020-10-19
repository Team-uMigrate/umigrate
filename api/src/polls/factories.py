import factory
from common.generics.generic_factories import GenericPostFactory
from .models import Poll, Option, Vote
from users.factories import UserFactory


class PollFactory(GenericPostFactory):
    class Meta:
        model = Poll


class OptionFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Option

    content = factory.Faker('paragraph')
    creator = factory.SubFactory(UserFactory)
    poll = factory.SubFactory(PollFactory)


class VoteFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Vote

    creator = factory.SubFactory(UserFactory)
    option = factory.SubFactory(OptionFactory)
