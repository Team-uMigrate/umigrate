from common.generics.generic_post_tests import GenericPostTestCase, GenericCommentTestCase
from rest_framework.test import APITestCase
from .models import Listing, ListingComment
from common.utils.create_resources import create_listing, create_listing_comments


# Test case for the listing API views
class ListingTestCase(GenericPostTestCase, APITestCase):

    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.resource_name = 'listings'
        self.model = Listing
        self.create_resource = create_listing
        self.create_data = {
            'title': 'My first listing',
            'content': 'This is my first listing',
            'region': 0,
            'category': 0,
            'price': 9976.00,
            'season': 2,
            'year': 2021
        }
        self.update_data = {
            'title': 'My first listing (edited)',
            'content': 'This is my first listing  (edited)',
            'region': 1,
            'category': 1,
            'price': 997,
            'season': 1,
            'year': 2023
        }

        GenericPostTestCase.setUp(self)


# Test case for the listing comment API views
class ListingCommentTestCase(GenericCommentTestCase, APITestCase):

    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.resource_name = 'listings'
        self.parent_name = 'listing'
        self.model = ListingComment
        self.create_resource = create_listing_comments
        self.create_parent = create_listing

        GenericCommentTestCase.setUp(self)
