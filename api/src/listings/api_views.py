from common.abstract_api_views import (
    AbstractModelViewSet,
    AbstractAddRemoveUser,
    AbstractLikedUsers,
)
from .filters import ListingFilter
from .models import Listing
from .serializers import ListingSerializer, ListingDetailSerializer
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from common.decorators import (
    model_view_set_swagger_decorator,
    api_view_swagger_decorator,
)


@model_view_set_swagger_decorator(["Listings"])
class ListingViewSet(AbstractModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    detail_serializer_class = ListingDetailSerializer
    filterset_class = ListingFilter


@api_view_swagger_decorator(["Listings"])
class LikedListings(AbstractAddRemoveUser):
    query_string = "liked_listings"
    serializer_class = ListingSerializer
    model_class = Listing


@api_view_swagger_decorator(["Listings"])
class SavedListings(AbstractAddRemoveUser):
    query_string = "saved_listings"
    serializer_class = ListingSerializer
    model_class = Listing


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Listings"]))
class ListingLikes(AbstractLikedUsers):
    model_class = Listing
