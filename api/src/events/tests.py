from common.generics.generic_post_tests import GenericPostTestCase, GenericCommentTestCase
from rest_framework.test import APITestCase
from .models import Event, EventComment
from common.utils.create_resources import create_events, create_event_comments
from datetime import datetime, timedelta


# Test case for the events API views
class EventTestCase(GenericPostTestCase, APITestCase):

    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.resource_name = 'events'
        self.model = Event
        self.create_resource = create_events
        self.create_data = {
            'title': 'My first event',
            'description': 'This is my first event',
            'region': 0,
            'price': 9976.00,
            'start_datetime': datetime.now().strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
            'end_datetime': (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
            'street_address': '400 University avenue',
            'city': 'Waterloo',
            'division': 'Ontario',
            'country': 'Canada',
        }
        self.update_data = {
            'title': 'My first event (edited)',
            'description': 'This is my first event (edited)',
            'region': 1,
            'price': 99,
            'start_datetime': datetime.now().strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
            'end_datetime': (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
            'street_address': '2 College west road',
            'city': 'Brampton',
            'division': 'Nunavut',
            'country': 'England',
        }

        GenericPostTestCase.setUp(self)


# Test case for the event comment API views
class EventCommentTestCase(GenericCommentTestCase, APITestCase):

    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.resource_name = 'events'
        self.parent_name = 'event'
        self.model = EventComment
        self.create_resource = create_event_comments
        self.create_parent = create_events

        GenericCommentTestCase.setUp(self)
