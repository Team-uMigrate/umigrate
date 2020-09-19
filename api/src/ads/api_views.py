from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy, \
    GenericCommentListCreate, GenericCommentRetrieveUpdateDestroy, GenericUserExtension
from .models import Ad, AdComment
from .serializers import AdSerializer, AdCommentSerializer
from django_filters import rest_framework as filters
from ads.filters import AdFilter

# HTTP GET: Returns a list of ads
# HTTP POST: Creates an ad
class AdListCreate(GenericPostListCreate):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer
    search_fields = ['title', 'features']
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AdFilter


# HTTP GET: Returns an ad
# HTTP PUT: Updates an ad
# HTTP PATCH: Partially updates an ad
# HTTP DELETE: Deletes an ad
class AdRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer


# HTTP GET: Returns a list of ad comments for the ad with the ID that matches the ID in the URL
# HTTP POST: Creates an ad comment for the ad with the ID that matches the ID in the URL
class AdCommentListCreate(GenericCommentListCreate):
    queryset = AdComment.objects.all()
    serializer_class = AdCommentSerializer
    parent_string = 'ad'


# HTTP GET: Returns an ad comment
# HTTP PUT: Updates an ad comment
# HTTP PATCH: Partially updates an ad comment
# HTTP DELETE: Deletes an ad comment
class AdCommentRetrieveUpdateDestroy(GenericCommentRetrieveUpdateDestroy):
    queryset = AdComment.objects.all()
    serializer_class = AdCommentSerializer
    parent_string = 'ad'


# HTTP GET: Returns true or false if a user has liked an ad
# HTTP POST: Like or unlike an ad
class AdLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return Ad.objects.get(id=obj_id).liked_users


# HTTP GET: Returns true or false if a user has liked an ad comment
# HTTP POST: Like or unlike an ad comment
class AdCommentLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return AdComment.objects.get(id=obj_id).liked_users
