import factory
from users.factories import UserFactory
from common.constants.choices import Choices, get_length
from .models import Job


class JobFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Job

    content = factory.Faker('paragraph')
    creator = factory.SubFactory(UserFactory)
    position = factory.Faker('job')
    company = factory.Faker('company')
    job_type = factory.Faker('random_int', min=0, max=get_length(Choices.JOB_TYPE_CHOICES)-1)
    start_datetime = factory.Faker('date')
    end_datetime = factory.Faker('date')
    city = factory.Faker('city')
