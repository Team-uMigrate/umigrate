import factory
import random
from .models import Room, Message
from common.constants.choices import Choices, get_length
from users.factories import UserFactory


class RoomFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Room

    title = factory.Faker('text', max_nb_chars=100)
    creator = factory.SubFactory(UserFactory)
    privacy_level = factory.Faker('random_int', min=0, max=get_length(Choices.NOTIFICATION_PRIVACY_CHOICES)-1)

    @factory.post_generation
    def members(self, create, extracted, **kwargs):
        if create:
            if isinstance(extracted, list):
                for user in extracted:
                    self.members.add(user)
            else:
                rand_int = random.randint(0, 2)
                for i in range(rand_int):
                    self.members.add(UserFactory(connected_users=[], blocked_users=[]))


class MessageFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Message

    content = factory.Faker('paragraph')
    creator = factory.SubFactory(UserFactory)
    room = factory.SubFactory(RoomFactory)

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
