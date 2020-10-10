from users.models import CustomUser
from rest_framework.test import APITestCase
from common.utils.create_resources import create_jobs
from rest_framework import status
from .models import Job
from datetime import date, timedelta


# Test case for the jobs API views
class JobTestCase(APITestCase):
    create_data = {
        'content': "Sanitational engineering is my passion",
        'position': 'My new job',
        'company': 'Big company',
        'job_type': 0,
        'start_date': date.today().strftime('%Y-%m-%d'),
        'end_date': (date.today() + timedelta(days=1)).strftime('%Y-%m-%d'),
        'city': 'Waterloo',
        'creator': 1
    }
    update_data = {
        'content': "Sanitational engineering is my passion",
        'position': 'My new job (edited)',
        'company': 'Big company (edited)',
        'job_type': 1,
        'start_date': date.today().strftime('%Y-%m-%d'),
        'end_date': (date.today() + timedelta(days=1)).strftime('%Y-%m-%d'),
        'city': 'Brampton',
        'creator': 1
    }
    ignored_keys = [
        'profile_photo',
        'background_photo'
    ]

    def setUp(self):
        self.user = CustomUser.objects.create_user(email='test0@uwaterloo.ca', password='Top$ecret150')
        self.client.login(email='test0@uwaterloo.ca', password='Top$ecret150')
        create_jobs(3)

    def test_list(self):
        response = self.client.get(f'/api/users/jobs/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_list = response.data['results']
        resource_list = Job.objects.all()
        self.assertEqual(len(response_list), len(resource_list))

    def test_create(self):
        response = self.client.post(f'/api/users/jobs/',  self.create_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['creator'], 1)

        response_dict = dict(response.data)
        for key in self.create_data:
            if key in self.ignored_keys:
                continue
            else:
                self.assertEqual(self.create_data[key], response_dict[key])

    def test_retrieve(self):
        response = self.client.get(f'/api/users/jobs/1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_dict = dict(response.data)
        obj = Job.objects.get(id=1).__dict__
        obj['datetime_created'] = obj['datetime_created'].strftime('%Y-%m-%dT%H:%M:%S.%fZ')
        obj['creator'] = obj['creator_id']
        for key in response_dict:
            if key in self.ignored_keys:
                continue
            elif key == 'start_date' or key == 'end_date':
                self.assertEqual(obj[key].strftime('%Y-%m-%d'), response_dict[key])
            else:
                self.assertEqual(obj[key], response_dict[key])

    def test_update(self):
        response = self.client.put(f'/api/users/jobs/1', self.update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['creator'], 1)

        response_dict = dict(response.data)
        for key in self.update_data:
            if key in self.ignored_keys:
                continue
            else:
                self.assertEqual(self.update_data[key], response_dict[key])

    def test_update_partial(self):
        response = self.client.patch(f'/api/users/jobs/1', self.update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['creator'], 1)

        response_dict = dict(response.data)
        for key in self.update_data:
            if key in self.ignored_keys:
                continue
            else:
                self.assertEqual(self.update_data[key], response_dict[key])

    def test_destroy(self):
        response = self.client.delete(f'/api/users/jobs/1')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
