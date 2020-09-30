from common.generics.generic_post_tests import GenericPostTestCase, GenericCommentTestCase
from rest_framework.test import APITestCase
from .models import Poll, PollComment, Option, Vote
from common.utils.create_resources import create_polls, create_poll_comments, create_options, create_votes
from users.models import CustomUser
from rest_framework import status


# Test case for the poll API views
class PollTestCase(GenericPostTestCase, APITestCase):

    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.resource_name = 'polls'
        self.model = Poll
        self.create_resource = create_polls
        self.create_data = {
            'title': 'My first post',
            'content': 'This is my first poll',
            'region': 0,
        }
        self.update_data = {
            'title': 'My first post (edited)',
            'content': 'This is my first poll (edited)',
            'region': 1,
        }

        GenericPostTestCase.setUp(self)


# Test case for the poll comment API views
class PollCommentTestCase(GenericCommentTestCase, APITestCase):

    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.resource_name = 'polls'
        self.parent_name = 'poll'
        self.model = PollComment
        self.create_resource = create_poll_comments
        self.create_parent = create_polls

        GenericCommentTestCase.setUp(self)


# Test case for option API views
class OptionTestCase(APITestCase):

    def setUp(self):
        self.user = CustomUser.objects.create_user(email='test0@uwaterloo.ca', password='Top$ecret150')
        self.client.login(email='test0@uwaterloo.ca', password='Top$ecret150')
        create_polls(1)
        create_options(3)

    def test_list(self):
        response = self.client.get('/api/polls/options/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_list = response.data['results']
        resource_list = Option.objects.all()
        self.assertEqual(len(response_list), len(resource_list))

    def test_create(self):
        data = {
            'content': 'Option',
            'poll': 1
        }

        response = self.client.post('/api/polls/options/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['poll'], 1)

        response_dict = dict(response.data)
        for key in data:
            self.assertEqual(data[key], response_dict[key])


# Test case for vote API views
class VoteTestCase(APITestCase):

    def setUp(self):
        self.user = CustomUser.objects.create_user(email='test0@uwaterloo.ca', password='Top$ecret150')
        self.client.login(email='test0@uwaterloo.ca', password='Top$ecret150')
        create_polls(1)
        create_options(1)
        create_votes(3)

    def test_list(self):
        response = self.client.get('/api/polls/options/votes/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_list = response.data['results']
        resource_list = Vote.objects.all()
        self.assertEqual(len(response_list), len(resource_list))

    def test_create(self):
        data = {
            'option': 1
        }
        response = self.client.post('/api/polls/options/votes/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['option'], 1)
