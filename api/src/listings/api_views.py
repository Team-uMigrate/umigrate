from common.abstract_api_views import AbstractModelViewSet
from common.generics.generic_post_api_views import GenericUserExtension
from .filters import ListingFilter
from .models import Listing
from .serializers import ListingSerializer, ListingDetailSerializer
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


@method_decorator(name='list', decorator=swagger_auto_schema(tags=['Listings']))
@method_decorator(name='create', decorator=swagger_auto_schema(tags=['Listings']))
@method_decorator(name='update', decorator=swagger_auto_schema(tags=['Listings']))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(tags=['Listings']))
@method_decorator(name='destroy', decorator=swagger_auto_schema(tags=['Listings']))
class ListingViewSet(AbstractModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    detail_serializer_class = ListingDetailSerializer
    search_fields = ['title', ]
    filterset_class = ListingFilter


# HTTP GET: Returns a list of liked users that liked a listing
# HTTP POST: Like or unlike a listing
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Listings']))
class ListingLike(GenericUserExtension):
    field_string = 'like'

    @staticmethod
    def field_func(obj_id):
        return Listing.objects.get(id=obj_id).liked_users
