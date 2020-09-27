from rest_framework import status
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
            'content': 'This is my first event',
            'region': 0,
            'price_scale': 1,
            'start_datetime': datetime.now().strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
            'end_datetime': (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
            'location': "TEST LOCATION"
        }
        self.update_data = {
            'title': 'My first event (edited)',
            'content': 'This is my first event (edited)',
            'region': 1,
            'price_scale': 2,
            'start_datetime': datetime.now().strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
            'end_datetime': (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
            'location': "NEW TEST LOCATION"
        }

        GenericPostTestCase.setUp(self)

    def test_interested_user(self):
        interested_data = {
            'interested': True,
            'id': 1
        }

        interested_response = self.api_client.post(f'/api/{self.resource_name}/interested', interested_data, format='json')
        self.assert_equal(interested_response.status_code, status.HTTP_200_OK)
        self.assert_equal(interested_response.data, interested_data)
        self.assert_equal(len(self.model.objects.get(id=1).interested_users.filter(id=1)), 1)

        obj = self.model.objects.get(id=2)
        obj.interested_users.add(1)

        uninterested_data = {
            'interested': False,
            'id': 2
        }

        uninterested_response = self.api_client.post(f'/api/{self.resource_name}/interested', uninterested_data, format='json')
        self.assert_equal(uninterested_response.status_code, status.HTTP_200_OK)
        self.assert_equal(uninterested_response.data, uninterested_data)
        self.assert_equal(len(self.model.objects.get(id=2).interested_users.filter(id=1)), 0)

    def test_attending_user(self):
        attending_data = {
            'attending': True,
            'id': 1
        }

        attending_response = self.api_client.post(f'/api/{self.resource_name}/attending', attending_data, format='json')
        self.assert_equal(attending_response.status_code, status.HTTP_200_OK)
        self.assert_equal(attending_response.data, attending_data)
        self.assert_equal(len(self.model.objects.get(id=1).attending_users.filter(id=1)), 1)

        obj = self.model.objects.get(id=2)
        obj.attending_users.add(1)

        unattending_data = {
            'attending': False,
            'id': 2
        }

        unnattending_response = self.api_client.post(f'/api/{self.resource_name}/attending', unattending_data, format='json')
        self.assert_equal(unnattending_response.status_code, status.HTTP_200_OK)
        self.assert_equal(unnattending_response.data, unattending_data)
        self.assert_equal(len(self.model.objects.get(id=2).attending_users.filter(id=1)), 0)


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
