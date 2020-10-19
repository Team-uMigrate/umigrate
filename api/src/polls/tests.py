from rest_framework.test import APITestCase
from common.abstract_tests import AbstractAPITestCase
from .models import Poll
from .serializers import PollSerializer, PollDetailSerializer
from .factories import PollFactory


# Test case for the polls endpoints
class PollTestCase(AbstractAPITestCase, APITestCase):

    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.assert_list_equal = self.assertListEqual
        self.endpoint = '/api/polls/'
        self.model_class = Poll
        self.serializer_class = PollSerializer
        self.detail_serializer_class = PollDetailSerializer
        self.factory_class = PollFactory
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
