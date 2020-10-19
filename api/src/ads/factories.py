import factory
from common.generics.generic_factories import GenericPostFactory, GenericCommentFactory
from .models import Ad, AdComment
from common.constants.choices import Choices, get_length
from string import ascii_uppercase


class AdFactory(GenericPostFactory):
    class Meta:
        model = Ad

    category = factory.Faker('random_int', min=0, max=get_length(Choices.AD_CATEGORY_CHOICES)-1)
    price = factory.Faker('pydecimal', left_digits=6, right_digits=2)
    postal_code = factory.Faker('bothify', text='?#?#?#', letters=ascii_uppercase)


class AdCommentFactory(GenericCommentFactory):
    class Meta:
        model = AdComment

    ad = factory.SubFactory(AdFactory)
