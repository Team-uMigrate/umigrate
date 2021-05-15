from common.abstract_api_views import (
    AbstractModelViewSet,
    AbstractAddRemoveUser,
    AbstractLikedUsers,
)
from .filters import PostFilterSet
from .models import Post
from .serializers import PostSerializer, PostDetailSerializer
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


@method_decorator(name="list", decorator=swagger_auto_schema(tags=["Posts"]))
@method_decorator(name="create", decorator=swagger_auto_schema(tags=["Posts"]))
@method_decorator(name="retrieve", decorator=swagger_auto_schema(tags=["Posts"]))
@method_decorator(name="update", decorator=swagger_auto_schema(tags=["Posts"]))
@method_decorator(name="partial_update", decorator=swagger_auto_schema(tags=["Posts"]))
@method_decorator(name="destroy", decorator=swagger_auto_schema(tags=["Posts"]))
class PostViewSet(AbstractModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    detail_serializer_class = PostDetailSerializer
    filterset_class = PostFilterSet


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Posts"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Posts"]))
class LikedPosts(AbstractAddRemoveUser):
    query_string = "liked_posts"
    serializer_class = PostSerializer
    model_class = Post


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Posts"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Posts"]))
class SavedPosts(AbstractAddRemoveUser):
    query_string = "saved_posts"
    serializer_class = PostSerializer
    model_class = Post


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Posts"]))
class PostLikes(AbstractLikedUsers):
    model_class = Post
