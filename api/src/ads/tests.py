from rest_framework.test import APITestCase
from common.abstract_tests import AbstractAPITestCase
from .models import Ad
from .serializers import AdSerializer, AdDetailSerializer
from .factories import AdFactory


# Test case for the ads endpoints
class AdTestCase(AbstractAPITestCase, APITestCase):

    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.assert_list_equal = self.assertListEqual
        self.endpoint = '/api/ads/'
        self.model_class = Ad
        self.serializer_class = AdSerializer
        self.detail_serializer_class = AdDetailSerializer
        self.factory_class = AdFactory
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
