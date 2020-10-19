from rest_framework.test import APITestCase
from common.abstract_tests import AbstractAPITestCase
from .models import Post
from .serializers import PostSerializer, PostDetailSerializer
from .factories import PostFactory


# Test case for the posts endpoints
class PostTestCase(AbstractAPITestCase, APITestCase):

    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.assert_list_equal = self.assertListEqual
        self.endpoint = '/api/posts/'
        self.model_class = Post
        self.serializer_class = PostSerializer
        self.detail_serializer_class = PostDetailSerializer
        self.factory_class = PostFactory
        self.pop_keys = [
            'id',
            'likes',
            'datetime_created',
        ]
        self.maxDiff = self.max_diff

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
