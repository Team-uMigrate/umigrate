from rest_framework import status

from common.abstract_tests import AbstractAPITestCase
from common.generics.generic_post_tests import GenericPostTestCase
from rest_framework.test import APITestCase
from unittest import skip

from .factories import RoomFactory
from .models import Room, Message
from common.utils.create_resources import create_rooms, create_messages


# Test case for the room API views
from .serializers import RoomSerializer


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

    # def test_get_members(self):
    #     response = self.api_client.get(f"/api/{self.resource_name}/1/members")
    #     self.assert_equal(response.status_code, status.HTTP_200_OK)
    #     self.assert_equal(response.data[0], {"id": 1})
    #
    # def test_post_members(self):
    #     add_members_data = {
    #         "members": [
    #             {
    #                 "id": 2,
    #                 "add": True,
    #             },
    #         ],
    #     }
    #
    #     add_members_response = self.api_client.post(
    #         f"/api/{self.resource_name}/1/members", add_members_data, format="json"
    #     )
    #     self.assert_equal(add_members_response.status_code, status.HTTP_200_OK)
    #     self.assert_equal(add_members_response.data[0], {"id": 1})
    #     self.assert_equal(add_members_response.data[1], {"id": 2})
    #     self.assert_equal(len(self.model.objects.get(id=1).members.filter(id=1)), 1)
    #     self.assert_equal(len(self.model.objects.get(id=1).members.filter(id=2)), 1)
    #
    #     obj = self.model.objects.get(id=2)
    #     obj.members.add(2)
    #
    #     remove_members_data = {
    #         "members": [
    #             {
    #                 "id": 2,
    #                 "add": False,
    #             },
    #         ],
    #     }
    #
    #     remove_members_response = self.api_client.post(
    #         f"/api/{self.resource_name}/2/members", remove_members_data, format="json"
    #     )
    #     self.assert_equal(remove_members_response.status_code, status.HTTP_200_OK)
    #     self.assert_equal(remove_members_response.data[0], {"id": 1})
    #     self.assert_equal(len(self.model.objects.get(id=2).members.filter(id=1)), 1)
    #     self.assert_equal(len(self.model.objects.get(id=2).members.filter(id=2)), 0)
