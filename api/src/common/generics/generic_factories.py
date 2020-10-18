import factory
from common.constants.choices import Choices, get_length
from users.factories import UserFactory
import random


class GenericPostFactory(factory.django.DjangoModelFactory):
    title = factory.Faker('text', max_nb_chars=100)
    content = factory.Faker('paragraph')
    region = factory.Faker('random_int', min=0, max=get_length(Choices.REGION_CHOICES)-1)
    creator = factory.SubFactory(UserFactory)

    @factory.post_generation
    def liked_users(self, create, extracted, **kwargs):
        if create:
            if isinstance(extracted, list):
                for user in extracted:
                    self.liked_users.add(user)
            else:
                rand_int = random.randint(0, 2)
                for i in range(rand_int):
                    self.liked_users.add(UserFactory(connected_users=[], blocked_users=[]))

    @factory.post_generation
    def tagged_users(self, create, extracted, **kwargs):
        if create:
            if isinstance(extracted, list):
                for user in extracted:
                    self.tagged_users.add(user)
            else:
                rand_int = random.randint(0, 2)
                for i in range(rand_int):
                    self.tagged_users.add(UserFactory(connected_users=[], blocked_users=[]))

    @factory.post_generation
    def saved_users(self, create, extracted, **kwargs):
        if create:
            if isinstance(extracted, list):
                for user in extracted:
                    self.saved_users.add(user)
            else:
                rand_int = random.randint(0, 2)
                for i in range(rand_int):
                    self.saved_users.add(UserFactory(connected_users=[], blocked_users=[]))


# Generic factory class for creating comment objects
class GenericCommentFactory(factory.django.DjangoModelFactory):
    content = factory.Faker('paragraph')
    creator = factory.SubFactory(UserFactory)

    @factory.post_generation
    def liked_users(self, create, extracted, **kwargs):
        if create:
            if isinstance(extracted, list):
                for user in extracted:
                    self.liked_users.add(user)
            else:
                rand_int = random.randint(0, 2)
                for i in range(rand_int):
                    self.liked_users.add(UserFactory(connected_users=[], blocked_users=[]))

    @factory.post_generation
    def tagged_users(self, create, extracted, **kwargs):
        if create:
            if isinstance(extracted, list):
                for user in extracted:
                    self.tagged_users.add(user)
            else:
                rand_int = random.randint(0, 2)
                for i in range(rand_int):
                    self.tagged_users.add(UserFactory(connected_users=[], blocked_users=[]))
