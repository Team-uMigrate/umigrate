from common.generics.generic_post_tests import GenericPostTestCase, GenericCommentTestCase
from rest_framework.test import APITestCase
from .models import Listing, ListingComment
from common.utils.create_resources import create_listing, create_listing_comments


# Test case for the listing API views
class ListingTestCase(GenericPostTestCase, APITestCase):

    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.resource_name = 'housing'
        self.model = Listing
        self.create_resource = create_listing
        self.create_data = {
            'title': 'My first listing',
            'description': 'This is my first listing',
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
            'title': 'My first listing (edited)',
            'description': 'This is my first listing  (edited)',
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


# Test case for the listing comment API views
class ListingCommentTestCase(GenericCommentTestCase, APITestCase):

    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.resource_name = 'listing'
        self.parent_name = 'listing'
        self.model = ListingComment
        self.create_resource = create_listing_comments
        self.create_parent = create_listing

        GenericCommentTestCase.setUp(self)
