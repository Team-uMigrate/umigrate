import factory
from common.generics.generic_factories import GenericPostFactory, GenericCommentFactory
from .models import Post, PostComment


class PostFactory(GenericPostFactory):
    class Meta:
        model = Post


class PostCommentFactory(GenericCommentFactory):
    class Meta:
        model = PostComment

    post = factory.SubFactory(PostFactory)
