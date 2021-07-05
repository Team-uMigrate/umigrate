from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from common.decorators import api_view_swagger_decorator
from common.generics.generic_post_api_views import GenericUserExtension
from notifications.utils import create_connection_request_notification
from .filters import UserFilterSet
from .models import CustomUser
from .serializers import UserSerializer, NotificationPreferencesSerializer
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

        if response.status_code != status.HTTP_200_OK:
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


@method_decorator(name="patch", decorator=swagger_auto_schema(tags=["Users"]))
@method_decorator(name="put", decorator=swagger_auto_schema(tags=["Users"]))
class NotificationPreferences(UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = NotificationPreferencesSerializer
    permission_classes = [
        IsAuthenticated,
    ]

    def put_or_patch(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        # Validate HTTP patch/put data
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # update the notification preferences field
        notification_preferences = serializer.data["notification_preferences"]
        self.request.user.notification_preferences = notification_preferences
        self.request.user.save()

        return Response(
            {"notification_preferences": notification_preferences},
            status=status.HTTP_200_OK,
        )

    def patch(self, request, *args, **kwargs):
        return self.put_or_patch(request, args, kwargs)

    def put(self, request, *args, **kwargs):
        return self.put_or_patch(request, args, kwargs)
