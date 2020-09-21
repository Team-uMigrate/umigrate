from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy, \
    GenericCommentListCreate, GenericCommentRetrieveUpdateDestroy, GenericUserExtension
from .models import Ad, AdComment
from .serializers import AdSerializer, AdCommentSerializer
from django_filters import rest_framework as filters
from ads.filters import AdFilter
from drf_yasg.utils import swagger_auto_schema


# HTTP GET: Returns a list of ads
# HTTP POST: Creates an ad
class AdListCreate(GenericPostListCreate):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer
    search_fields = ['title', 'features']
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AdFilter

    @swagger_auto_schema(tags=['Ads'])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Ads'])
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


# HTTP GET: Returns an ad
# HTTP PUT: Updates an ad
# HTTP PATCH: Partially updates an ad
# HTTP DELETE: Deletes an ad
class AdRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer

    @swagger_auto_schema(tags=['Ads'])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Ads'])
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Ads'])
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Ads'])
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)


# HTTP GET: Returns a list of ad comments for the ad with the ID that matches the ID in the URL
# HTTP POST: Creates an ad comment for the ad with the ID that matches the ID in the URL
class AdCommentListCreate(GenericCommentListCreate):
    queryset = AdComment.objects.all()
    serializer_class = AdCommentSerializer
    parent_string = 'ad'

    @swagger_auto_schema(tags=['Ads'])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Ads'])
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


# HTTP GET: Returns an ad comment
# HTTP PUT: Updates an ad comment
# HTTP PATCH: Partially updates an ad comment
# HTTP DELETE: Deletes an ad comment
class AdCommentRetrieveUpdateDestroy(GenericCommentRetrieveUpdateDestroy):
    queryset = AdComment.objects.all()
    serializer_class = AdCommentSerializer
    parent_string = 'ad'

    @swagger_auto_schema(tags=['Ads'])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Ads'])
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Ads'])
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Ads'])
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)


# HTTP POST: Like or unlike an ad
class AdLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return Ad.objects.get(id=obj_id).liked_users

    @swagger_auto_schema(tags=['Ads'])
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

# HTTP POST: Like or unlike an ad comment
class AdCommentLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return AdComment.objects.get(id=obj_id).liked_users

    @swagger_auto_schema(tags=['Ads'])
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
