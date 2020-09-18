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
        obj['photo'] = None
        print(response_dict)
        print(obj)
        for key in response_dict:
            self.assertEqual(obj[key], response_dict[key])

    def test_get_followed_user(self):
        response = self.client.get('/api/users/1/follow')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'followed': False})

    def test_post_followed_user(self):
        followed_data = {
            'followed': True
        }

        followed_response = self.client.post('/api/users/1/follow', followed_data, format='json')
        self.assertEqual(followed_response.status_code, status.HTTP_200_OK)
        self.assertEqual(followed_response.data, {'followed': True})
        self.assertEqual(len(CustomUser.objects.get(id=1).connected_users.filter(id=1)), 1)

        obj = CustomUser.objects.get(id=2)
        obj.connected_users.add(1)

        unfollowed_data = {
            'followed': False
        }

        unfollowed_response = self.client.post('/api/users/2/follow', unfollowed_data, format='json')
        self.assertEqual(unfollowed_response.status_code, status.HTTP_200_OK)
        self.assertEqual(unfollowed_response.data, {'followed': False})
        self.assertEqual(len(CustomUser.objects.get(id=2).connected_users.filter(id=1)), 0)

    def test_get_blocked_user(self):
        response = self.client.get('/api/users/1/block')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'blocked': False})

    def test_post_blocked_user(self):
        blocked_data = {
            'blocked': True
        }

        blocked_response = self.client.post('/api/users/1/block', blocked_data, format='json')
        self.assertEqual(blocked_response.status_code, status.HTTP_200_OK)
        self.assertEqual(blocked_response.data, {'blocked': True})
        self.assertEqual(len(CustomUser.objects.get(id=1).blocked_users.filter(id=1)), 1)

        obj = CustomUser.objects.get(id=2)
        obj.blocked_users.add(1)

        unblocked_data = {
            'blocked': False
        }

        unblocked_response = self.client.post('/api/users/2/block', unblocked_data, format='json')
        self.assertEqual(unblocked_response.status_code, status.HTTP_200_OK)
        self.assertEqual(unblocked_response.data, {'blocked': False})
        self.assertEqual(len(CustomUser.objects.get(id=2).blocked_users.filter(id=1)), 0)
