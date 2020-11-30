from types import SimpleNamespace
from rest_framework import status
from rest_framework.test import APITestCase
from common.abstract_tests import AbstractAPITestCase
from .models import Comment, Reply
from .serializers import (
    CommentSerializer,
    CommentDetailSerializer,
    ReplySerializer,
    ReplyDetailSerializer,
)
from .factories import CommentFactory, ReplyFactory


# Test case for the comments endpoints
class CommentTestCase(AbstractAPITestCase, APITestCase):
    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.assert_list_equal = self.assertListEqual
        self.endpoint = "/api/comments/"
        self.order_ascending = "?ordering=datetime_created"
        self.order_descending = "?ordering=-datetime_created"
        self.model_class = Comment
        self.serializer_class = CommentSerializer
        self.detail_serializer_class = CommentDetailSerializer
        self.factory_class = CommentFactory
        self.factory_kwargs = {
            "liked_users": [],
            "tagged_users": [],
            "saved_users": [],
        }
        self.pop_keys = [
            "id",
            "likes",
            "datetime_created",
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

    def test_datetime_created(self):
        # standard list test with modified endpoint
        response = self.api_client.get(self.endpoint + self.order_ascending)
        self.assert_equal(
            response.status_code,
            status.HTTP_200_OK,
            "Status code should be 200. " f"Error: {response.data}",
        )
        results = response.data["results"]
        items = self.model_class.objects.all()
        self.assert_equal(
            len(results), len(items), f"There should be ${len(items)} results"
        )

        ascendingSortedList = sorted(results, key=lambda x: x["id"])
        self.assert_equal(
            results,
            ascendingSortedList,
            "Results should be sorted in ascending chronological order.",
        )

    def test_reverse_datetime_created(self):
        response = self.api_client.get(self.endpoint + self.order_descending)
        self.assert_equal(
            response.status_code,
            status.HTTP_200_OK,
            "Status code should be 200. " f"Error: {response.data}",
        )
        results = response.data["results"]
        items = self.model_class.objects.all()
        self.assert_equal(
            len(results), len(items), f"There should be ${len(items)} results"
        )

        descendingSortedList = sorted(results, key=lambda x: x["id"], reverse=True)
        self.assert_equal(
            results,
            descendingSortedList,
            "Results should be sorted in descending chronological order.",
        )


# Test case for the replies endpoints
class ReplyTestCase(AbstractAPITestCase, APITestCase):
    def setUp(self):
        self.api_client = self.client
        self.assert_equal = self.assertEqual
        self.assert_list_equal = self.assertListEqual
        self.endpoint = "/api/comments/replies/"
        self.order_ascending = "?ordering=datetime_created"
        self.order_descending = "?ordering=-datetime_created"
        self.model_class = Reply
        self.serializer_class = ReplySerializer
        self.detail_serializer_class = ReplyDetailSerializer
        self.factory_class = ReplyFactory
        self.factory_kwargs = {
            "liked_users": [],
            "tagged_users": [],
            "saved_users": [],
        }
        self.pop_keys = [
            "id",
            "likes",
            "datetime_created",
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

    def test_datetime_created(self):
        # standard list test with modified endpoint
        response = self.api_client.get(self.endpoint + self.order_ascending)
        self.assert_equal(
            response.status_code,
            status.HTTP_200_OK,
            "Status code should be 200. " f"Error: {response.data}",
        )
        results = response.data["results"]
        items = self.model_class.objects.all()
        self.assert_equal(
            len(results), len(items), f"There should be ${len(items)} results"
        )

        ascendingSortedList = sorted(results, key=lambda x: x["id"])
        self.assert_equal(
            results,
            ascendingSortedList,
            "Results should be sorted in ascending chronological order.",
        )

    def test_reverse_datetime_created(self):
        response = self.api_client.get(self.endpoint + self.order_descending)
        self.assert_equal(
            response.status_code,
            status.HTTP_200_OK,
            "Status code should be 200. " f"Error: {response.data}",
        )
        results = response.data["results"]
        items = self.model_class.objects.all()
        self.assert_equal(
            len(results), len(items), f"There should be ${len(items)} results"
        )

        descendingSortedList = sorted(results, key=lambda x: x["id"], reverse=True)
        self.assert_equal(
            results,
            descendingSortedList,
            "Results should be sorted in descending chronological order.",
        )
