from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy, \
  GenericUserExtension
from .models import Listing, ListingComment
from .serializers import ListingSerializer, ListingCommentSerializer, ListingDetailSerializer, \
    ListingCommentDetailSerializer
from django_filters import rest_framework as filters
from listings.filters import ListingFilter
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


# HTTP GET: Returns a list of listings
# HTTP POST: Creates a listing
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Listings']))
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Listings']))
class ListingListCreate(GenericPostListCreate):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    detail_serializer_class = ListingDetailSerializer
    search_fields = ['title', 'features']
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ListingFilter


# HTTP GET: Returns a listing
# HTTP PUT: Updates a listing
# HTTP PATCH: Partially updates a listing
# HTTP DELETE: Deletes a listing
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Listings']))
@method_decorator(name='put', decorator=swagger_auto_schema(tags=['Listings']))
@method_decorator(name='patch', decorator=swagger_auto_schema(tags=['Listings']))
@method_decorator(name='delete', decorator=swagger_auto_schema(tags=['Listings']))
class ListingRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    detail_serializer_class = ListingDetailSerializer


# HTTP GET: Returns a list of listing comments for the listing with the ID that matches the ID in the URL
# HTTP POST: Creates a listing comment for the listing with the ID that matches the ID in the URL
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Listings']))
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Listings']))
class ListingCommentListCreate(GenericPostListCreate):
    queryset = ListingComment.objects.all()
    serializer_class = ListingCommentSerializer
    filter_fields = ['listing', ]
    detail_serializer_class = ListingCommentDetailSerializer


# HTTP GET: Returns a listing comment
# HTTP PUT: Updates a listing comment
# HTTP PATCH: Partially updates a listing comment
# HTTP DELETE: Deletes a listing comment
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Listings']))
@method_decorator(name='put', decorator=swagger_auto_schema(tags=['Listings']))
@method_decorator(name='patch', decorator=swagger_auto_schema(tags=['Listings']))
@method_decorator(name='delete', decorator=swagger_auto_schema(tags=['Listings']))
class ListingCommentRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = ListingComment.objects.all()
    serializer_class = ListingCommentSerializer
    detail_serializer_class = ListingCommentDetailSerializer


# HTTP GET: Returns a list of liked users that liked a listing
# HTTP POST: Like or unlike a listing
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Listings']))
class ListingLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return Listing.objects.get(id=obj_id).liked_users


# HTTP GET: Returns a list of liked users that liked a listing comment
# HTTP POST: Like or unlike a listing comment
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Listings']))
class ListingCommentLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return ListingComment.objects.get(id=obj_id).liked_users
