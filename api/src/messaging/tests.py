from common.abstract_tests import AbstractAPITestCase
from rest_framework.test import APITestCase
from users.factories import UserFactory
from .factories import RoomFactory
from .models import Room
from .serializers import RoomSerializer


# Test case for the room API views
class RoomTestCase(AbstractAPITestCase, APITestCase):
    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.assert_list_equal = self.assertListEqual
        self.endpoint = "/api/rooms/"
        self.model_class = Room
        self.serializer_class = RoomSerializer
        self.detail_serializer_class = RoomSerializer
        self.factory_class = RoomFactory
        self.pop_keys = ["id", "datetime_created", "members"]
        self.maxDiff = self.max_diff

        users = UserFactory.create_batch(5, connected_users=[], blocked_users=[])
        items = self.factory_class.create_batch(5, members=users)
        self.api_client.login(email=users[0].email, password="Top$ecret150")

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
