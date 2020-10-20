from common.abstract_api_views import AbstractModelViewSet
from common.generics.generic_post_api_views import GenericUserExtension
from .models import Comment, Reply
from .serializers import CommentSerializer, CommentDetailSerializer, ReplySerializer, ReplyDetailSerializer
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Comments']))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=['Comments']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Comments']))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=['Comments']))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=['Comments']))
@method_decorator(name='destroy', decorator=swagger_auto_schema(tags=['Comments']))
class CommentViewSet(AbstractModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    detail_serializer_class = CommentDetailSerializer
    filter_fields = ['region', 'datetime_created', 'creator', 'object_id', 'content_type']
    search_fields = ['content', ]


@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Comments']))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=['Comments']))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(tags=['Comments']))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=['Comments']))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=['Comments']))
@method_decorator(name='destroy', decorator=swagger_auto_schema(tags=['Comments']))
class ReplyViewSet(AbstractModelViewSet):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer
    detail_serializer_class = ReplyDetailSerializer
    filter_fields = ['region', 'datetime_created', 'creator', 'comment']
    search_fields = ['content', ]


# HTTP GET: Returns a list of liked users that liked a post
# HTTP POST: Like or unlike a post
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Comments']))
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Comments']))
class CommentLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return Comment.objects.get(id=obj_id).liked_users


# HTTP GET: Returns a list of liked users that liked a post
# HTTP POST: Like or unlike a post
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Comments']))
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Comments']))
class ReplyLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return Reply.objects.get(id=obj_id).liked_users
