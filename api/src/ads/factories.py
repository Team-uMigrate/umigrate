import factory
from common.abstract_factories import AbstractFactory
from .models import Ad
from common.constants.choices import Choices, get_length
from string import ascii_uppercase


class AdFactory(AbstractFactory):
    class Meta:
        model = Ad

    category = factory.Faker('random_int', min=0, max=get_length(Choices.AD_CATEGORY_CHOICES)-1)
    price = factory.Faker('pydecimal', left_digits=6, right_digits=2)
    postal_code = factory.Faker('bothify', text='?#?#?#', letters=ascii_uppercase)
