import factory
from common.generics.generic_factories import GenericPostFactory
from .models import Post


class PostFactory(GenericPostFactory):
    class Meta:
        model = Post
