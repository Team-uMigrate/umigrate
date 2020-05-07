from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated

from common.generics.generic_post_api_views import GenericUserExtension
from .models import CustomUser
from .serializers import UserSerializer


class UserList(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        IsAuthenticated,
    ]

    def list(self, request, *args, **kwargs):
        return ListAPIView.list(self, request, *args, **kwargs)


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
        return CustomUser.objects.get(id=obj_id).followed_users


# HTTP GET: Returns true or false if a user is blocking another user
# HTTP POST: Block or unblock another user
class BlockUser(GenericUserExtension):
    response_string = 'blocked'

    @staticmethod
    def field_func(obj_id):
        return CustomUser.objects.get(id=obj_id).blocked_users
