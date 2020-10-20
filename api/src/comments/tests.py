from rest_framework.test import APITestCase
from common.abstract_tests import AbstractAPITestCase
from .models import Comment, Reply
from .serializers import CommentSerializer, CommentDetailSerializer, ReplySerializer, ReplyDetailSerializer
from .factories import CommentFactory, ReplyFactory


# Test case for the comments endpoints
class CommentTestCase(AbstractAPITestCase, APITestCase):

    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.assert_list_equal = self.assertListEqual
        self.endpoint = '/api/comments/'
        self.model_class = Comment
        self.serializer_class = CommentSerializer
        self.detail_serializer_class = CommentDetailSerializer
        self.factory_class = CommentFactory
        self.pop_keys = [
            'id',
            'likes',
            'datetime_created',
        ]
        self.maxDiff = self.max_diff

        AbstractAPITestCase.setUp(self)

    def test_list(self):
        AbstractAPITestCase.test_list(self)

    def test_create(self):
        AbstractAPITestCase.test_create(self)

    def test_retrieve(self):
        AbstractAPITestCase.test_retrieve(self)

    def test_update(self):
        AbstractAPITestCase.test_update(self)

    def test_update_partial(self):
        AbstractAPITestCase.test_update_partial(self)

    def test_destroy(self):
        AbstractAPITestCase.test_destroy(self)


# Test case for the replies endpoints
class ReplyTestCase(AbstractAPITestCase, APITestCase):

    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.assert_list_equal = self.assertListEqual
        self.endpoint = '/api/comments/replies/'
        self.model_class = Reply
        self.serializer_class = ReplySerializer
        self.detail_serializer_class = ReplyDetailSerializer
        self.factory_class = ReplyFactory
        self.pop_keys = [
            'id',
            'likes',
            'datetime_created',
        ]
        self.maxDiff = self.max_diff

        AbstractAPITestCase.setUp(self)

    def test_list(self):
        AbstractAPITestCase.test_list(self)

    def test_create(self):
        AbstractAPITestCase.test_create(self)

    def test_retrieve(self):
        AbstractAPITestCase.test_retrieve(self)

    def test_update(self):
        AbstractAPITestCase.test_update(self)

    def test_update_partial(self):
        AbstractAPITestCase.test_update_partial(self)

    def test_destroy(self):
        AbstractAPITestCase.test_destroy(self)
