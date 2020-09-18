from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from common.generics.generic_post_api_views import GenericUserExtension
from .models import CustomUser
from .serializers import UserSerializer


# HTTP GET: Returns a list of users
class UserList(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        IsAuthenticated,
    ]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filter_fields = ['email', 'pronouns', 'datetime_created', 'birthday', 'current_term', 'enrolled_program',
                     'region', 'phone_number', ]
    search_fields = ['first_name', 'last_name', 'preferred_name', 'email', ]

    def list(self, request, *args, **kwargs):
        return ListAPIView.list(self, request, *args, **kwargs)


# HTTP GET: Returns a user
class UserRetrieve(RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        IsAuthenticated,
    ]
    lookup_field = 'id'


# HTTP GET: Returns true or false if a user is following another user
# HTTP POST: Follow or unfollow another user
class FollowUser(GenericUserExtension):
    response_string = 'followed'

    @staticmethod
    def field_func(obj_id):
        return CustomUser.objects.get(id=obj_id).connected_users


# HTTP GET: Returns true or false if a user is blocking another user
# HTTP POST: Block or unblock another user
class BlockUser(GenericUserExtension):
    response_string = 'blocked'

    @staticmethod
    def field_func(obj_id):
        return CustomUser.objects.get(id=obj_id).blocked_users
