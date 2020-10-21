from common.abstract_factories import AbstractFactory
from .models import Post


class PostFactory(AbstractFactory):
    class Meta:
        model = Post
