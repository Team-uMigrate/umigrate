from common.abstract_api_views import (
    AbstractModelViewSet,
    AbstractAddRemoveUser,
    AbstractLikedUsers,
    AbstractRetrieveUsers,
)
from .filters import ListingFilter, RoommateFilter
from .models import Listing, RoommatePost
from .serializers import (
    ListingSerializer,
    ListingDetailSerializer,
    RoommateSerializer,
    RoommateDetailSerializer,
)
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


@api_view_swagger_decorator(["Listings"])
class ContactedListings(AbstractAddRemoveUser):
    query_string = "contacted_listings"
    serializer_class = ListingSerializer
    model_class = Listing


@api_view_swagger_decorator(["Listings"])
class ConfirmedListings(AbstractAddRemoveUser):
    query_string = "confirmed_listings"
    serializer_class = ListingSerializer
    model_class = Listing


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Listings"]))
class ListingLikes(AbstractLikedUsers):
    model_class = Listing


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Listings"]))
class ListingContactedUsers(AbstractRetrieveUsers):
    model_class = Listing
    query_string = "contacted_users"


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Listings"]))
class ListingConfirmedUsers(AbstractRetrieveUsers):
    model_class = Listing
    query_string = "confirmed_users"


@model_view_set_swagger_decorator(["RoommatePost"])
class RoommateViewSet(AbstractModelViewSet):
    queryset = RoommatePost.objects.all()
    serializer_class = RoommateSerializer
    detail_serializer_class = RoommateDetailSerializer
    filterset_class = RoommateFilter


@api_view_swagger_decorator(["RoommatePost"])
class ContactedRoommatesPosts(AbstractAddRemoveUser):
    query_string = "contacted_roommate_posts"
    serializer_class = RoommateSerializer
    model_class = RoommatePost


@api_view_swagger_decorator(["RoommatePost"])
class ConfirmedRoommatePosts(AbstractAddRemoveUser):
    query_string = "confirmed_roommate_posts"
    serializer_class = RoommateSerializer
    model_class = RoommatePost


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["RoommatePost"]))
class RoommatePostContactedUsers(AbstractRetrieveUsers):
    model_class = RoommatePost
    query_string = "contacted_users"


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["RoommatePost"]))
class RoommatePostConfirmedUsers(AbstractRetrieveUsers):
    model_class = RoommatePost
    query_string = "confirmed_users"
