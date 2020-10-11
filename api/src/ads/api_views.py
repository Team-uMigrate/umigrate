from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy, \
   GenericUserExtension
from .models import Ad, AdComment
from .serializers import AdSerializer, AdCommentSerializer, AdDetailSerializer, AdCommentDetailSerializer
from django_filters import rest_framework as filters
from ads.filters import AdFilter
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


# HTTP GET: Returns a list of ads
# HTTP POST: Creates an ad
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Ads']))
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Ads']))
class AdListCreate(GenericPostListCreate):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer
    detail_serializer_class = AdDetailSerializer
    search_fields = ['title', 'features']
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AdFilter


# HTTP GET: Returns an ad
# HTTP PUT: Updates an ad
# HTTP PATCH: Partially updates an ad
# HTTP DELETE: Deletes an ad
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Ads']))
@method_decorator(name='put', decorator=swagger_auto_schema(tags=['Ads']))
@method_decorator(name='patch', decorator=swagger_auto_schema(tags=['Ads']))
@method_decorator(name='delete', decorator=swagger_auto_schema(tags=['Ads']))
class AdRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer
    detail_serializer_class = AdDetailSerializer


# HTTP GET: Returns a list of ad comments for the ad with the ID that matches the ID in the URL
# HTTP POST: Creates an ad comment for the ad with the ID that matches the ID in the URL
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Ads']))
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Ads']))
class AdCommentListCreate(GenericPostListCreate):
    queryset = AdComment.objects.all()
    serializer_class = AdCommentSerializer
    filter_fields = ['ad', ]
    detail_serializer_class = AdCommentDetailSerializer


# HTTP GET: Returns an ad comment
# HTTP PUT: Updates an ad comment
# HTTP PATCH: Partially updates an ad comment
# HTTP DELETE: Deletes an ad comment
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Ads']))
@method_decorator(name='put', decorator=swagger_auto_schema(tags=['Ads']))
@method_decorator(name='patch', decorator=swagger_auto_schema(tags=['Ads']))
@method_decorator(name='delete', decorator=swagger_auto_schema(tags=['Ads']))
class AdCommentRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = AdComment.objects.all()
    serializer_class = AdCommentSerializer
    detail_serializer_class = AdCommentDetailSerializer


# HTTP GET: Returns a list of liked users that liked an ad
# HTTP POST: Like or unlike an ad
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Ads']))
class AdLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return Ad.objects.get(id=obj_id).liked_users


# HTTP GET: Returns a list of liked users that liked an ad comment
# HTTP POST: Like or unlike an ad comment
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Ads']))
class AdCommentLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return AdComment.objects.get(id=obj_id).liked_users
