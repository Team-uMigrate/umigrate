from common.generics.generic_post_tests import GenericPostTestCase, GenericCommentTestCase
from rest_framework.test import APITestCase
from .models import Ad, AdComment
from common.utils.create_resources import create_ads, create_ad_comments


# Test case for the ads API views
class AdTestCase(GenericPostTestCase, APITestCase):

    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.resource_name = 'ads'
        self.model = Ad
        self.create_resource = create_ads
        self.create_data = {
            'title': 'My first event',
            'description': 'This is my first event',
            'region': 0,
            'category': 0,
            'features': 'feature1, feature2, feature3',
            'price': 9976.00,
        }
        self.update_data = {
            'title': 'My first post (edited)',
            'description': 'This is my first post (edited)',
            'region': 1,
            'category': 1,
            'features': 'new feature1, new feature2',
            'price': 123,
        }

        GenericPostTestCase.setUp(self)


# Test case for the ad comment API views
class AdCommentTestCase(GenericCommentTestCase, APITestCase):

    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.resource_name = 'ads'
        self.parent_name = 'ad'
        self.model = AdComment
        self.create_resource = create_ad_comments
        self.create_parent = create_ads

        GenericCommentTestCase.setUp(self)
