from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy, \
    GenericCommentListCreate, GenericCommentRetrieveUpdateDestroy, GenericUserExtension
from .models import Listing, ListingComment
from .serializers import ListingSerializer, ListingCommentSerializer
from django_filters import rest_framework as filters
from listings.filters import ListingFilter
from drf_yasg.utils import swagger_auto_schema


# HTTP GET: Returns a list of listings
# HTTP POST: Creates a listing
class ListingListCreate(GenericPostListCreate):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    search_fields = ['title', 'features']
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ListingFilter

    @swagger_auto_schema(tags=['Listings'])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Listings'])
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


# HTTP GET: Returns a listing
# HTTP PUT: Updates a listing
# HTTP PATCH: Partially updates a listing
# HTTP DELETE: Deletes a listing
class ListingRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

    @swagger_auto_schema(tags=['Listings'])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Listings'])
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Listings'])
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Listings'])
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)


# HTTP GET: Returns a list of listing comments for the listing with the ID that matches the ID in the URL
# HTTP POST: Creates a listing comment for the listing with the ID that matches the ID in the URL
class ListingCommentListCreate(GenericCommentListCreate):
    queryset = ListingComment.objects.all()
    serializer_class = ListingCommentSerializer
    parent_string = 'listing'

    @swagger_auto_schema(tags=['Listings'])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Listings'])
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


# HTTP GET: Returns a listing comment
# HTTP PUT: Updates a listing comment
# HTTP PATCH: Partially updates a listing comment
# HTTP DELETE: Deletes a listing comment
class ListingCommentRetrieveUpdateDestroy(GenericCommentRetrieveUpdateDestroy):
    queryset = ListingComment.objects.all()
    serializer_class = ListingCommentSerializer
    parent_string = 'listing'

    @swagger_auto_schema(tags=['Listings'])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Listings'])
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Listings'])
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Listings'])
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)


# HTTP POST: Like or unlike a listing
class ListingLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return Listing.objects.get(id=obj_id).liked_users

    @swagger_auto_schema(tags=['Listings'])
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


# HTTP POST: Like or unlike a listing comment
class ListingCommentLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return ListingComment.objects.get(id=obj_id).liked_users

    @swagger_auto_schema(tags=['Listings'])
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
