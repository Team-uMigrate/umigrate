from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from common.decorators import api_view_swagger_decorator
from common.generics.generic_post_api_views import GenericUserExtension
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


@api_view_swagger_decorator(["Users"])
class BlockUser(GenericUserExtension):
    field_string = "block"

    @staticmethod
    def field_func(obj_id):
        return CustomUser.objects.get(id=obj_id).blocked_users
