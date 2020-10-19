from rest_framework.viewsets import ModelViewSet
from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy
from .models import Comment, Reply
from .serializers import CommentSerializer, CommentDetailSerializer, ReplySerializer, ReplyDetailSerializer
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


# HTTP GET: Returns a list of comments
# HTTP POST: Creates a comment
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Comments']))
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Comments']))
class CommentListCreate(GenericPostListCreate):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    detail_serializer_class = CommentDetailSerializer
    filter_fields = ['region', 'datetime_created', 'creator', 'object_id', 'content_type']
    search_fields = ['content', ]


# HTTP GET: Returns a comment
# HTTP PUT: Updates a comment
# HTTP PATCH: Partially updates a comment
# HTTP DELETE: Deletes a comment
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Comments']))
@method_decorator(name='put', decorator=swagger_auto_schema(tags=['Comments']))
@method_decorator(name='patch', decorator=swagger_auto_schema(tags=['Comments']))
@method_decorator(name='delete', decorator=swagger_auto_schema(tags=['Comments']))
class CommentRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    detail_serializer_class = CommentDetailSerializer


# HTTP GET: Returns a list of replies
# HTTP POST: Creates a reply
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Replies']))
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Replies']))
class ReplyListCreate(GenericPostListCreate):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer
    detail_serializer_class = ReplyDetailSerializer
    filter_fields = ['region', 'datetime_created', 'creator', 'comment']
    search_fields = ['content', ]


# HTTP GET: Returns a reply
# HTTP PUT: Updates a reply
# HTTP PATCH: Partially updates a reply
# HTTP DELETE: Deletes a reply
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Replies']))
@method_decorator(name='put', decorator=swagger_auto_schema(tags=['Replies']))
@method_decorator(name='patch', decorator=swagger_auto_schema(tags=['Replies']))
@method_decorator(name='delete', decorator=swagger_auto_schema(tags=['Replies']))
class ReplyRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer
    detail_serializer_class = ReplyDetailSerializer
