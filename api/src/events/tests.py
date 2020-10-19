from rest_framework.test import APITestCase
from common.abstract_tests import AbstractAPITestCase
from .models import Event
from .serializers import EventSerializer, EventDetailSerializer
from .factories import EventFactory


# Test case for the events endpoints
class EventTestCase(AbstractAPITestCase, APITestCase):

    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.assert_list_equal = self.assertListEqual
        self.endpoint = '/api/events/'
        self.model_class = Event
        self.serializer_class = EventSerializer
        self.detail_serializer_class = EventDetailSerializer
        self.factory_class = EventFactory
        self.pop_keys = [
            'id',
            'likes',
            'interested',
            'attending',
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
