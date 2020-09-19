from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy, \
    GenericCommentListCreate, GenericCommentRetrieveUpdateDestroy, GenericUserExtension
from .models import Post, PostComment
from .serializers import PostSerializer, PostCommentSerializer


# HTTP GET: Returns a list of posts
# HTTP POST: Creates a post
class PostListCreate(GenericPostListCreate):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_fields = ['region', 'datetime_created', 'creator', ]
    search_fields = ['title', ]


# HTTP GET: Returns a post
# HTTP PUT: Updates a post
# HTTP PATCH: Partially updates a post
# HTTP DELETE: Deletes a post
class PostRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


# HTTP GET: Returns a list of post comments for the post with the ID that matches the ID in the URL
# HTTP POST: Creates a post comment for the post with the ID that matches the ID in the URL
class PostCommentListCreate(GenericCommentListCreate):
    queryset = PostComment.objects.all()
    serializer_class = PostCommentSerializer
    parent_string = 'post'


# HTTP GET: Returns a post comment
# HTTP PUT: Updates a post comment
# HTTP PATCH: Partially updates a post comment
# HTTP DELETE: Deletes a post comment
class PostCommentRetrieveUpdateDestroy(GenericCommentRetrieveUpdateDestroy):
    queryset = PostComment.objects.all()
    serializer_class = PostCommentSerializer
    parent_string = 'post'


# HTTP POST: Like or unlike a post
class PostLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return Post.objects.get(id=obj_id).liked_users


# HTTP POST: Like or unlike a post comment
class PostCommentLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return PostComment.objects.get(id=obj_id).liked_users
