from django_filters.rest_framework import DjangoFilterBackend
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from common.abstract_serializers import PostSaveSerializer
from common.abstract_models import IsCreatorOrReadOnly
from users.serializers import BasicUserSerializer
from users.models import CustomUser


# An abstract api view class that supports creating, retrieving, updating, and destroying shared items
class AbstractModelViewSet(ModelViewSet):
    queryset = None  # Must be overridden
    serializer_class = None  # Must be overridden
    detail_serializer_class = None  # Must be overridden
    permission_classes = [
        IsAuthenticated,
        IsCreatorOrReadOnly,
    ]
    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
    ]
    lookup_field = "id"
    lookup_value_regex = "(\\d+)"

    def get_serializer_class(self):
        # Use the detailed serializer class on HTTP GET and regular serializer class on all other HTTP methods
        if self.request.method == "GET":
            return self.detail_serializer_class
        return self.serializer_class


# An abstract api view class that supports retrieving and saving shared items
class AbstractSavedView(ListAPIView):
    serializer_class = None  # Must be overridden
    model_class = None  # Must be overridden
    query_string = None  # Must be overridden
    permission_classes = [
        IsAuthenticated,
    ]

    def get_queryset(self):
        # Retrieve the user's saved shared items
        return getattr(self.request.user, self.query_string).all()

    def get_serializer_class(self):
        # Use the detailed serializer class on HTTP GET and regular serializer class on all other HTTP methods
        if self.request.method == "GET":
            return self.serializer_class
        return PostSaveSerializer

    def post(self, request, *args, **kwargs):
        serializer = PostSaveSerializer(data=request.data)

        # Validate HTTP POST data
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        should_save = serializer.data["save"]
        obj_id = serializer.data["id"]

        try:
            obj = self.model_class.objects.get(id=obj_id)
            # Add or remove the user from the list of saved users for the shared item
            if should_save:
                obj.saved_users.add(request.user.id)
            else:
                obj.saved_users.remove(request.user.id)

            return Response({"save": should_save, "id": obj_id})

        # Shared item was not found
        except ObjectDoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)


# An abstract api view class that supports retrieving the liked users for a shared item
class AbstractLikedUsers(ListAPIView):
    queryset = CustomUser.objects.all()
    model_class = None  # Must be overridden
    serializer_class = BasicUserSerializer
    permission_classes = [
        IsAuthenticated,
    ]

    def get_queryset(self):
        # Retrieve the liked users for a shared item
        return self.model_class.objects.get(id=self.kwargs["id"]).liked_users.all()
