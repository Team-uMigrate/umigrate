from notifications.utils import create_liked_shared_item_notification
from django.db.models import Model
from django.db.models.query import QuerySet
from django_filters.rest_framework import DjangoFilterBackend
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.serializers import Serializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from common.abstract_serializers import (
    AddRemoveUserSerializer,
    AbstractSharedItemSerializer,
)
from common.abstract_models import IsCreatorOrReadOnly, AbstractPostModel
from users.serializers import BasicUserSerializer


class AbstractModelViewSet(ModelViewSet):
    """
    An abstract model view set class that supports creating, retrieving, updating, and destroying shared items.
    """

    queryset: QuerySet[AbstractPostModel] = None
    """
    The queryset to use for accessing data in the database. Must be overwritten.    
    """

    serializer_class: AbstractSharedItemSerializer = None
    """
    The serializer class to use for all HTTP requests except HTTP GET requests. Must be overwritten.
    """

    detail_serializer_class: AbstractSharedItemSerializer = None
    """
    The serializer class to use for only HTTP GET requests. Must be overwritten.
    """

    permission_classes = [
        IsAuthenticated,
        IsCreatorOrReadOnly,
    ]
    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
    ]
    search_fields = [
        "title",
    ]
    lookup_field = "id"
    lookup_value_regex = "(\\d+)"

    def get_serializer_class(self):
        # Use the detailed serializer class on HTTP GET and regular serializer class on all other HTTP methods
        if self.request.method == "GET":
            return self.detail_serializer_class
        return self.serializer_class


class AbstractAddRemoveUser(ListAPIView):
    """
    An abstract API view class that supports adding and removing a user to and from a many to many field.
    """

    serializer_class: Serializer = None
    """
    The serializer class to use for all HTTP requests except HTTP GET requests. Must be overwritten.
    """

    model_class: Model = None
    """
    The model class with the many to many field to add the user to. Must be overwritten.
    """

    query_string: str = None
    """
    The name of the attribute on the user that is used to get a list of objects. Must be overwritten.
    """

    permission_classes = [
        IsAuthenticated,
    ]

    def get_queryset(self):
        # Retrieve the list of objects using the attribute specified by the query string
        return getattr(self.request.user, self.query_string).all()

    def get_serializer_class(self):
        # Use the detailed serializer class on HTTP GET and regular serializer class on all other HTTP methods
        if self.request.method == "GET":
            return self.serializer_class

        return AddRemoveUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = AddRemoveUserSerializer(data=request.data)

        # Validate HTTP POST data
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        should_add: bool = serializer.data["should_add"]
        shared_item_id: int = serializer.data["id"]

        try:
            shared_item = self.model_class.objects.get(id=shared_item_id)
            # Add or remove an object from the list of objects using the attribute specified by the query string
            if should_add:
                getattr(request.user, self.query_string).add(shared_item)
                # Send a liked shared item notification if the user liked a shared item
                if self.query_string.startswith("liked_"):
                    create_liked_shared_item_notification(shared_item, request.user)

            else:
                getattr(request.user, self.query_string).remove(shared_item)

            return Response({"should_add": should_add, "id": shared_item_id})

        # Shared item was not found
        except ObjectDoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)


class AbstractLikedUsers(ListAPIView):
    """
    An abstract API view class that supports retrieving the liked users for a shared item.
    """

    model_class: AbstractPostModel = None
    """
    The model class with the liked users many to many field to add the user to. Must be overwritten.
    """

    serializer_class = BasicUserSerializer
    permission_classes = [
        IsAuthenticated,
    ]

    def get_queryset(self):
        # Retrieve the list of users that have liked a shared item
        return self.model_class.objects.get(id=self.kwargs["id"]).liked_users.all()


class AbstractRetrieveUsers(ListAPIView):
    """
    An abstract API view class that supports retrieving users for a shared item.
    """

    model_class: AbstractPostModel = None
    """
    The model class with the users many to many field to add the user to. Must be overwritten.
    """

    query_string: str = None
    """
    The name of the attribute on the model that is used to get a list of objects. Must be overwritten.
    """

    serializer_class = BasicUserSerializer
    permission_classes = [
        IsAuthenticated,
    ]

    def get_queryset(self):
        # Retrieve the list of users associated with query_string
        return getattr(
            self.model_class.objects.get(id=self.kwargs["id"]), self.query_string
        ).all()
