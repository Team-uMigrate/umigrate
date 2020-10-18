from rest_framework import status
from common.generics.generic_post_tests import GenericPostTestCase
from rest_framework.test import APITestCase
from unittest import skip
from .models import Room, Message
from common.utils.create_resources import create_rooms, create_messages


# Test case for the room API views
class RoomTestCase(GenericPostTestCase, APITestCase):

    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.resource_name = 'rooms'
        self.model = Room
        self.create_resource = create_rooms
        self.create_data = {
            'title': 'My first room',
            'privacy_level': 0,
            'members': [],
        }
        self.update_data = {
            'title': 'My first room (edited)',
            'privacy_level': 1,
            'members': [
                2,
            ],
        }
        self.ignored_keys.append('profile_photo')
        self.ignored_keys.append('background_photo')
        GenericPostTestCase.setUp(self)

    @skip('Not needed for rooms')
    def test_like(self):
        pass

    def test_retrieve(self):
        response = self.api_client.get(f'/api/{self.resource_name}/1')
        self.assert_equal(response.status_code, status.HTTP_200_OK)

        response_dict = dict(response.data)
        obj = self.model.objects.get(id=1).__dict__
        obj['datetime_created'] = obj['datetime_created'].strftime('%Y-%m-%dT%H:%M:%S.%fZ')
        obj['creator'] = obj['creator_id']
        for key in response_dict:
            if key in self.ignored_keys:
                continue
            else:
                self.assert_equal(obj[key], response_dict[key])

    def test_create(self):
        super().test_create()
        self.assert_equal(len(Room.objects.get(id=1).members.filter(id=1)), 1)

    def test_update(self):
        super().test_update()
        self.assert_equal(len(Room.objects.get(id=1).members.filter(id=1)), 1)
        self.assertEqual(len(Room.objects.get(id=1).members.filter(id=2)), 1)

    def test_update_partial(self):
        super().test_update_partial()
        self.assert_equal(len(Room.objects.get(id=1).members.filter(id=1)), 1)
        self.assert_equal(len(Room.objects.get(id=1).members.filter(id=2)), 1)

    def test_get_members(self):
        response = self.api_client.get(f'/api/{self.resource_name}/1/members')
        self.assert_equal(response.status_code, status.HTTP_200_OK)
        self.assert_equal(response.data[0], {'id': 1})

    def test_post_members(self):
        add_members_data = {
            'members': [
                {
                    'id': 2,
                    'add': True,
                },
            ],
        }

        add_members_response = self.api_client.post(f'/api/{self.resource_name}/1/members', add_members_data,
                                                    format='json')
        self.assert_equal(add_members_response.status_code, status.HTTP_200_OK)
        self.assert_equal(add_members_response.data[0], {'id': 1})
        self.assert_equal(add_members_response.data[1], {'id': 2})
        self.assert_equal(len(self.model.objects.get(id=1).members.filter(id=1)), 1)
        self.assert_equal(len(self.model.objects.get(id=1).members.filter(id=2)), 1)

        obj = self.model.objects.get(id=2)
        obj.members.add(2)

        remove_members_data = {
            'members': [
                {
                    'id': 2,
                    'add': False,
                },
            ],
        }

        remove_members_response = self.api_client.post(f'/api/{self.resource_name}/2/members', remove_members_data,
                                                       format='json')
        self.assert_equal(remove_members_response.status_code, status.HTTP_200_OK)
        self.assert_equal(remove_members_response.data[0], {'id': 1})
        self.assert_equal(len(self.model.objects.get(id=2).members.filter(id=1)), 1)
        self.assert_equal(len(self.model.objects.get(id=2).members.filter(id=2)), 0)
