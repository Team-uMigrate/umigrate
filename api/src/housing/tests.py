from common.generics.generic_post_tests import GenericPostTestCase, GenericCommentTestCase
from rest_framework.test import APITestCase
from .models import Housing, HousingComment
from common.utils.create_resources import create_housing, create_housing_comments
from datetime import datetime, timedelta


# Test case for the housing API views
class HousingTestCase(GenericPostTestCase, APITestCase):

    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.resource_name = 'housing'
        self.model = Housing
        self.create_resource = create_housing
        self.create_data = {
            'title': 'My first housing',
            'description': 'This is my first housing',
            'region': 0,
            'category': 0,
            'features': 'feature1, feature2, feature3',
            'price': 9976.00,
            'street_address': '400 University avenue',
            'city': 'Waterloo',
            'division': 'Ontario',
            'country': 'Canada',
            'term': 0,
        }
        self.update_data = {
            'title': 'My first housing (edited)',
            'description': 'This is my first housing  (edited)',
            'region': 1,
            'category': 1,
            'features': 'new feature1, new feature3',
            'price': 997,
            'street_address': '400 College west road',
            'city': 'Brampton',
            'division': 'Quebec',
            'country': 'France',
            'term': 1,
        }

        GenericPostTestCase.setUp(self)


# Test case for the housing comment API views
class HousingCommentTestCase(GenericCommentTestCase, APITestCase):

    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.resource_name = 'housing'
        self.parent_name = 'housing'
        self.model = HousingComment
        self.create_resource = create_housing_comments
        self.create_parent = create_housing

        GenericCommentTestCase.setUp(self)
