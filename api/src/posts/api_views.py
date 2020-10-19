from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy, \
GenericUserExtension
from .models import Post
from .serializers import PostSerializer, PostDetailSerializer
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


# HTTP GET: Returns a list of posts
# HTTP POST: Creates a post
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Posts']))
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Posts']))
class PostListCreate(GenericPostListCreate):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    detail_serializer_class = PostDetailSerializer
    filter_fields = ['region', 'datetime_created', 'creator', ]
    search_fields = ['title', ]


# HTTP GET: Returns a post
# HTTP PUT: Updates a post
# HTTP PATCH: Partially updates a post
# HTTP DELETE: Deletes a post
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Posts']))
@method_decorator(name='put', decorator=swagger_auto_schema(tags=['Posts']))
@method_decorator(name='patch', decorator=swagger_auto_schema(tags=['Posts']))
@method_decorator(name='delete', decorator=swagger_auto_schema(tags=['Posts']))
class PostRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    detail_serializer_class = PostDetailSerializer


# HTTP GET: Returns a list of liked users that liked a post
# HTTP POST: Like or unlike a post
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Posts']))
class PostLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return Post.objects.get(id=obj_id).liked_users
