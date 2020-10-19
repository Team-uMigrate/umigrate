import factory
import random
from .models import CustomUser
from common.constants.choices import Choices, get_length
from allauth.account.models import EmailAddress


# Factory class for creating user objects
class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = CustomUser

    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    preferred_name = factory.Faker('name')
    email = factory.LazyAttributeSequence(lambda user, i: f'{user.first_name[0].lower()}{i}{user.last_name.lower()}@uwaterloo.ca')
    pronouns = factory.Faker('random_int', min=0, max=get_length(Choices.PRONOUN_CHOICES)-1)
    bio = factory.Faker('paragraph')
    birthday = factory.Faker('date_of_birth')
    current_term = factory.Faker('random_int', min=0, max=get_length(Choices.TERM_CHOICES)-1)
    enrolled_program = factory.Faker('random_int', min=0, max=get_length(Choices.PROGRAM_CHOICES)-1)
    phone_number = factory.Faker('msisdn')
    region = factory.Faker('random_int', min=0, max=get_length(Choices.REGION_CHOICES)-1)
    password = factory.PostGenerationMethodCall('set_password', 'Top$ecret150')

    @factory.PostGeneration
    def verify_email(self, create, extracted, **kwargs):
        email_address = EmailAddress.objects.add_email(request=None, user=self, email=self.email, confirm=False)
        email_address.verified = True
        email_address.save()

    @factory.post_generation
    def connected_users(self, create, extracted, **kwargs):
        if create:
            if isinstance(extracted, list):
                for user in extracted:
                    self.connected_users.add(user)
            else:
                rand_int = random.randint(0, 2)
                for i in range(rand_int):
                    self.connected_users.add(UserFactory(connected_users=[], blocked_users=[]))

    @factory.post_generation
    def blocked_users(self, create, extracted, **kwargs):
        if create:
            if isinstance(extracted, list):
                for user in extracted:
                    self.blocked_users.add(user)
            else:
                rand_int = random.randint(0, 2)
                for i in range(rand_int):
                    self.blocked_users.add(UserFactory(connected_users=[], blocked_users=[]))
