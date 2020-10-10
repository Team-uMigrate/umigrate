from rest_framework.test import APITestCase
from users.models import CustomUser
from rest_framework import status


# Test case for the test API views
class UserTestCase(APITestCase):

    def setUp(self):
        self.user = CustomUser.objects.create_user(email='test0@uwaterloo.ca', password='Top$ecret150')
        CustomUser.objects.create_user(email='test1@uwaterloo.ca', password='Top$ecret150')
        self.client.login(email='test0@uwaterloo.ca', password='Top$ecret150')

    def test_list(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_list = response.data['results']
        resource_list = CustomUser.objects.all()
        self.assertEqual(len(response_list), len(resource_list))

    def test_retrieve(self):
        response = self.client.get('/api/users/1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_dict = dict(response.data)
        obj = CustomUser.objects.get(id=1).__dict__
        obj['datetime_created'] = obj['datetime_created'].strftime('%Y-%m-%dT%H:%M:%S.%fZ')
        obj['birthday'] = obj['birthday'].strftime('%Y-%m-%d')
        obj['profile_photo'] = None
        obj['background_photo'] = None
        for key in response_dict:
            if key == 'is_connected' or key == 'is_blocked' or key == 'connected':
                continue
            self.assertEqual(obj[key], response_dict[key])

    def test_connect_user(self):
        connect_data = {
            'connect': True,
            'id': 1
        }

        connect_response = self.client.post('/api/users/connect', connect_data, format='json')
        self.assertEqual(connect_response.status_code, status.HTTP_200_OK)
        self.assertEqual(connect_response.data, connect_data)
        self.assertEqual(len(CustomUser.objects.get(id=1).connected_users.filter(id=1)), 1)

        obj = CustomUser.objects.get(id=2)
        obj.connected_users.add(1)

        disconnect_data = {
            'connect': False,
            'id': 2
        }

        disconnect_response = self.client.post('/api/users/connect', disconnect_data, format='json')
        self.assertEqual(disconnect_response.status_code, status.HTTP_200_OK)
        self.assertEqual(disconnect_response.data, disconnect_data)
        self.assertEqual(len(CustomUser.objects.get(id=2).connected_users.filter(id=1)), 0)

    def test_block_user(self):
        block_data = {
            'block': True,
            'id': 1
        }

        block_response = self.client.post('/api/users/block', block_data, format='json')
        self.assertEqual(block_response.status_code, status.HTTP_200_OK)
        self.assertEqual(block_response.data, block_data)
        self.assertEqual(len(CustomUser.objects.get(id=1).blocked_users.filter(id=1)), 1)

        obj = CustomUser.objects.get(id=2)
        obj.blocked_users.add(1)

        unblock_data = {
            'block': False,
            'id': 2
        }

        unblock_response = self.client.post('/api/users/block', unblock_data, format='json')
        self.assertEqual(unblock_response.status_code, status.HTTP_200_OK)
        self.assertEqual(unblock_response.data, unblock_data)
        self.assertEqual(len(CustomUser.objects.get(id=2).blocked_users.filter(id=1)), 0)
