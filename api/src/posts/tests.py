from rest_framework.test import APITestCase
from common.abstract_tests import (
    AbstractAPITestCase,
    AbstractSavedTestCase,
    AbstractLikesTestCase,
)
from users.serializers import BasicUserSerializer
from .models import Post
from .serializers import PostSerializer, PostDetailSerializer
from .factories import PostFactory


# Test case for the posts endpoints
class PostTestCase(
    AbstractAPITestCase,
    AbstractSavedTestCase,
    APITestCase,
):
    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.assert_list_equal = self.assertListEqual
        self.endpoint = "/api/posts/"
        self.model_class = Post
        self.serializer_class = PostSerializer
        self.detail_serializer_class = PostDetailSerializer
        self.factory_class = PostFactory
        self.factory_kwargs = {
            "liked_users": [],
            "tagged_users": [],
            "saved_users": [],
        }
        self.pop_keys = [
            "id",
            "likes",
            "datetime_created",
        ]
        self.maxDiff = self.max_diff
        self.save_options = ["save"]

        AbstractAPITestCase.setUp(self)

    def test_list(self):
        AbstractAPITestCase.test_list(self)

    def test_create(self):
        AbstractAPITestCase.test_create(self)

    def test_retrieve(self):
        AbstractAPITestCase.test_retrieve(self)

    def test_update(self):
        AbstractAPITestCase.test_update(self)

    def test_update_partial(self):
        AbstractAPITestCase.test_update_partial(self)

    def test_destroy(self):
        AbstractAPITestCase.test_destroy(self)


class PostLikesTestCase(AbstractLikesTestCase, APITestCase):
    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.assert_list_equal = self.assertListEqual
        self.endpoint = "/api/posts/1/likes"
        self.model_class = Post
        self.detail_serializer_class = BasicUserSerializer
        self.factory_class = PostFactory
        self.factory_kwargs = {
            "liked_users": [1],
            "tagged_users": [],
            "saved_users": [],
        }

        AbstractLikesTestCase.setUp(self)

    def test_liked_users(self):
        AbstractLikesTestCase.test_liked_users(self)
