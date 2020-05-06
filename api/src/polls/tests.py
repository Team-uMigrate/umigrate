from common.generics.generic_post_tests import GenericPostTestCase, GenericCommentTestCase
from rest_framework.test import APITestCase
from .models import Poll, PollComment
from common.utils.create_resources import create_polls, create_poll_comments, create_options, create_votes


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
            'description': 'This is my first poll',
            'region': 0,
        }
        self.update_data = {
            'title': 'My first post (edited)',
            'description': 'This is my first poll (edited)',
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
