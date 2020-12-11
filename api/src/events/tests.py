from rest_framework.test import APITestCase
from common.abstract_tests import (
    AbstractAPITestCase,
    AbstractSavedTestCase,
    AbstractLikesTestCase,
)
from users.serializers import BasicUserSerializer
from .models import Event
from .serializers import EventSerializer, EventDetailSerializer
from .factories import EventFactory


# Test case for the events endpoints
class EventTestCase(AbstractAPITestCase, AbstractSavedTestCase, APITestCase):
    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.assert_list_equal = self.assertListEqual
        self.endpoint = "/api/events/"
        self.model_class = Event
        self.serializer_class = EventSerializer
        self.detail_serializer_class = EventDetailSerializer
        self.factory_class = EventFactory
        self.factory_kwargs = {
            "liked_users": [],
            "tagged_users": [],
            "saved_users": [],
            "interested_users": [],
            "attending_users": [],
        }
        self.pop_keys = [
            "id",
            "likes",
            "interested",
            "attending",
            "datetime_created",
        ]
        self.maxDiff = self.max_diff
        self.save_options = ["saved"]

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

    def test_save(self):
        AbstractSavedTestCase.test_save(self)


# Test case for the liked users endpoint for events
class EventLikesTestCase(AbstractLikesTestCase, APITestCase):
    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.assert_list_equal = self.assertListEqual
        self.endpoint = "/api/events/1/likes"
        self.model_class = Event
        self.detail_serializer_class = BasicUserSerializer
        self.factory_class = EventFactory
        self.factory_kwargs = {
            "liked_users": [1],
            "tagged_users": [],
            "saved_users": [],
        }

        AbstractLikesTestCase.setUp(self)

    def test_liked_users(self):
        AbstractLikesTestCase.test_liked_users(self)
