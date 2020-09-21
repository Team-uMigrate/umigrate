from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy, \
    GenericCommentListCreate, GenericCommentRetrieveUpdateDestroy, GenericUserExtension
from .models import Post, PostComment
from .serializers import PostSerializer, PostCommentSerializer
from drf_yasg.utils import swagger_auto_schema


# HTTP GET: Returns a list of posts
# HTTP POST: Creates a post
class PostListCreate(GenericPostListCreate):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_fields = ['region', 'datetime_created', 'creator', ]
    search_fields = ['title', ]

    @swagger_auto_schema(tags=['Posts'])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Posts'])
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


# HTTP GET: Returns a post
# HTTP PUT: Updates a post
# HTTP PATCH: Partially updates a post
# HTTP DELETE: Deletes a post
class PostRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    @swagger_auto_schema(tags=['Posts'])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Posts'])
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Posts'])
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Posts'])
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)


# HTTP GET: Returns a list of post comments for the post with the ID that matches the ID in the URL
# HTTP POST: Creates a post comment for the post with the ID that matches the ID in the URL
class PostCommentListCreate(GenericCommentListCreate):
    queryset = PostComment.objects.all()
    serializer_class = PostCommentSerializer
    parent_string = 'post'

    @swagger_auto_schema(tags=['Posts'])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Posts'])
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


# HTTP GET: Returns a post comment
# HTTP PUT: Updates a post comment
# HTTP PATCH: Partially updates a post comment
# HTTP DELETE: Deletes a post comment
class PostCommentRetrieveUpdateDestroy(GenericCommentRetrieveUpdateDestroy):
    queryset = PostComment.objects.all()
    serializer_class = PostCommentSerializer
    parent_string = 'post'

    @swagger_auto_schema(tags=['Posts'])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Posts'])
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Posts'])
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Posts'])
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)


# HTTP POST: Like or unlike a post
class PostLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return Post.objects.get(id=obj_id).liked_users

    @swagger_auto_schema(tags=['Posts'])
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


# HTTP POST: Like or unlike a post comment
class PostCommentLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return PostComment.objects.get(id=obj_id).liked_users

    @swagger_auto_schema(tags=['Posts'])
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
