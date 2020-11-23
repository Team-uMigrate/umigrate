from rest_framework.test import APITestCase
from common.abstract_tests import AbstractAPITestCase, AbstractLikesTestCase
from users.serializers import BasicUserSerializer
from .models import Listing
from .serializers import ListingSerializer, ListingDetailSerializer
from .factories import ListingFactory


# Test case for the listings endpoints
class ListingTestCase(AbstractAPITestCase, APITestCase):
    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.assert_list_equal = self.assertListEqual
        self.endpoint = "/api/listings/"
        self.model_class = Listing
        self.serializer_class = ListingSerializer
        self.detail_serializer_class = ListingDetailSerializer
        self.factory_class = ListingFactory
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


# Test case for the liked users endpoint for listings
class ListingLikesTestCase(AbstractLikesTestCase, APITestCase):
    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.assert_list_equal = self.assertListEqual
        self.endpoint = "/api/listings/1/likes"
        self.model_class = Listing
        self.detail_serializer_class = BasicUserSerializer
        self.factory_class = ListingFactory
        self.factory_kwargs = {
            "liked_users": [1],
            "tagged_users": [],
            "saved_users": [],
        }

        AbstractLikesTestCase.setUp(self)

    def test_liked_users(self):
        AbstractLikesTestCase.test_liked_users(self)