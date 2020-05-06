from common.generics.generic_post_tests import GenericPostTestCase, GenericCommentTestCase
from rest_framework.test import APITestCase
from .models import Post, PostComment
from common.utils.create_resources import create_posts, create_post_comments


# Test case for the post API views
class PostTestCase(GenericPostTestCase, APITestCase):

    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.resource_name = 'posts'
        self.model = Post
        self.create_resource = create_posts
        self.create_data = {
            "title": "My first post",
            "description": "This is my first post",
            "region": 0
        }
        self.update_data = {
            "title": "My first post (edited)",
            "description": "This is my first post (edited)",
            "region": 1
        }

        GenericPostTestCase.setUp(self)


# Test case for the post comment API views
class PostCommentTestCase(GenericCommentTestCase, APITestCase):

    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.resource_name = 'posts'
        self.parent_name = 'post'
        self.model = PostComment
        self.create_resource = create_post_comments
        self.create_parent = create_posts

        GenericCommentTestCase.setUp(self)
