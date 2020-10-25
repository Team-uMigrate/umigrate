import factory
from django.contrib.contenttypes.models import ContentType
from django.db.models import QuerySet
from comments.models import Comment, Reply
from common.constants.choices import Choices, get_length
from users.factories import UserFactory
from posts.factories import PostFactory
import random


class CommentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Comment

    content = factory.Faker("paragraph")
    region = factory.Faker(
        "random_int", min=0, max=get_length(Choices.REGION_CHOICES) - 1
    )
    creator = factory.SubFactory(UserFactory, connected_users=[], blocked_users=[])
    content_object = factory.SubFactory(
        PostFactory, liked_users=[], tagged_users=[], saved_users=[], creator=creator
    )
    object_id = factory.SelfAttribute("content_object.id")
    content_type = factory.LazyAttribute(
        lambda o: ContentType.objects.get_for_model(o.content_object)
    )

    @factory.post_generation
    def liked_users(self, create, extracted, **kwargs):
        if create:
            if isinstance(extracted, (list, QuerySet)):
                for user in extracted:
                    self.liked_users.add(user)
            else:
                rand_int = random.randint(0, 2)
                for i in range(rand_int):
                    self.liked_users.add(
                        UserFactory(connected_users=[], blocked_users=[])
                    )

    @factory.post_generation
    def tagged_users(self, create, extracted, **kwargs):
        if create:
            if isinstance(extracted, (list, QuerySet)):
                for user in extracted:
                    self.tagged_users.add(user)
            else:
                rand_int = random.randint(0, 2)
                for i in range(rand_int):
                    self.tagged_users.add(
                        UserFactory(connected_users=[], blocked_users=[])
                    )

    @factory.post_generation
    def saved_users(self, create, extracted, **kwargs):
        if create:
            if isinstance(extracted, (list, QuerySet)):
                for user in extracted:
                    self.saved_users.add(user)
            else:
                rand_int = random.randint(0, 2)
                for i in range(rand_int):
                    self.saved_users.add(
                        UserFactory(connected_users=[], blocked_users=[])
                    )


class ReplyFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Reply

    content = factory.Faker("paragraph")
    region = factory.Faker(
        "random_int", min=0, max=get_length(Choices.REGION_CHOICES) - 1
    )
    creator = factory.SubFactory(UserFactory, connected_users=[], blocked_users=[])
    comment = factory.SubFactory(
        CommentFactory, liked_users=[], tagged_users=[], saved_users=[], creator=creator
    )

    @factory.post_generation
    def liked_users(self, create, extracted, **kwargs):
        if create:
            if isinstance(extracted, (list, QuerySet)):
                for user in extracted:
                    self.liked_users.add(user)
            else:
                rand_int = random.randint(0, 2)
                for i in range(rand_int):
                    self.liked_users.add(
                        UserFactory(connected_users=[], blocked_users=[])
                    )

    @factory.post_generation
    def tagged_users(self, create, extracted, **kwargs):
        if create:
            if isinstance(extracted, (list, QuerySet)):
                for user in extracted:
                    self.tagged_users.add(user)
            else:
                rand_int = random.randint(0, 2)
                for i in range(rand_int):
                    self.tagged_users.add(
                        UserFactory(connected_users=[], blocked_users=[])
                    )

    @factory.post_generation
    def saved_users(self, create, extracted, **kwargs):
        if create:
            if isinstance(extracted, (list, QuerySet)):
                for user in extracted:
                    self.saved_users.add(user)
            else:
                rand_int = random.randint(0, 2)
                for i in range(rand_int):
                    self.saved_users.add(
                        UserFactory(connected_users=[], blocked_users=[])
                    )
