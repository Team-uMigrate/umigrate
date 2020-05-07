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
        for key in response_dict:
            self.assertEqual(obj[key], response_dict[key])
