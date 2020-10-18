from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from common.generics.generic_post_api_views import GenericUserExtension
from posts.models import Post
from posts.serializers import PostDetailSerializer
from .models import CustomUser
from .serializers import UserSerializer
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


# HTTP GET: Returns a list of users
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Users']))
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
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Users']))
class UserRetrieve(RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        IsAuthenticated,
    ]
    lookup_field = 'id'

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


# HTTP POST: Connect or disconnect from another user
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Users']))
class ConnectUser(GenericUserExtension):
    field_string = 'connect'

    @staticmethod
    def field_func(obj_id):
        return CustomUser.objects.get(id=obj_id).connected_users


# HTTP POST: Block or unblock another user
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Users']))
class BlockUser(GenericUserExtension):
    field_string = 'block'

    @staticmethod
    def field_func(obj_id):
        return CustomUser.objects.get(id=obj_id).blocked_users


# HTTP GET: returns saved posts for a user
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Users']))
class SavedPosts(GenericUserExtension):
    field_string = 'save'
    serializer = PostDetailSerializer

    @staticmethod
    def field_func(obj_id):
        return Post.objects.get(id=obj_id).saved_users

    @staticmethod
    def users_func(user_id):
        return CustomUser.objects.get(id=user_id).saved_posts_post_set
