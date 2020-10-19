from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy, \
   GenericUserExtension
from .models import Ad
from .serializers import AdSerializer, AdDetailSerializer
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


# HTTP GET: Returns a list of liked users that liked an ad
# HTTP POST: Like or unlike an ad
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Ads']))
class AdLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return Ad.objects.get(id=obj_id).liked_users
