from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_200_OK
from common.decorators import api_view_swagger_decorator
from common.generics.generic_post_api_views import GenericUserExtension
from notifications.helpers import create_connection_request_notification
from .filters import UserFilterSet
from .models import CustomUser
from .serializers import UserSerializer
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Users"]))
class UserList(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        IsAuthenticated,
    ]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = UserFilterSet
    search_fields = [
        "email",
        "first_name",
        "last_name",
        "preferred_name",
    ]


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Users"]))
class UserRetrieve(RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        IsAuthenticated,
    ]
    lookup_field = "id"


@api_view_swagger_decorator(["Users"])
class ConnectUser(GenericUserExtension):
    field_string = "connect"

    @staticmethod
    def field_func(obj_id):
        return CustomUser.objects.get(id=obj_id).connected_users

    def post(self, request, *args, **kwargs):
        response = GenericUserExtension.post(self, request, args, kwargs)

        if response.status_code != HTTP_200_OK:
            return response

        add_user: bool = request.data[self.field_string]
        if add_user:
            sender = request.user
            receiver = CustomUser.objects.get(id=request.data["id"])
            is_requesting = receiver.connected_users.filter(
                id=request.data["id"]
            ).exists()
            create_connection_request_notification(receiver, sender, is_requesting)

        return response


@api_view_swagger_decorator(["Users"])
class BlockUser(GenericUserExtension):
    field_string = "block"

    @staticmethod
    def field_func(obj_id):
        return CustomUser.objects.get(id=obj_id).blocked_users
