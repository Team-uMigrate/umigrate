from common.abstract_api_views import (
    AbstractModelViewSet,
    AbstractAddRemoveUser,
    AbstractLikedUsers,
    AbstractRetrieveUsers,
)
from .filters import AdFilterSet
from .models import Ad
from .serializers import AdSerializer, AdDetailSerializer
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from common.decorators import (
    model_view_set_swagger_decorator,
    api_view_swagger_decorator,
)


@model_view_set_swagger_decorator(["Ads"])
class AdViewSet(AbstractModelViewSet):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer
    detail_serializer_class = AdDetailSerializer
    filterset_class = AdFilterSet


@api_view_swagger_decorator(["Ads"])
class LikedAds(AbstractAddRemoveUser):
    query_string = "liked_ads"
    serializer_class = AdSerializer
    model_class = Ad


@api_view_swagger_decorator(["Ads"])
class SavedAds(AbstractAddRemoveUser):
    query_string = "saved_ads"
    serializer_class = AdSerializer
    model_class = Ad


@api_view_swagger_decorator(["Ads"])
class ContactedAds(AbstractAddRemoveUser):
    query_string = "contacted_ads"
    serializer_class = AdSerializer
    model_class = Ad


@api_view_swagger_decorator(["Ads"])
class ConfirmedAds(AbstractAddRemoveUser):
    query_string = "confirmed_ads"
    serializer_class = AdSerializer
    model_class = Ad


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Ads"]))
class AdLikes(AbstractLikedUsers):
    model_class = Ad
    query_string = "liked_users"


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Ads"]))
class AdContacted(AbstractRetrieveUsers):
    model_class = Ad
    query_string = "contacted_users"


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Ads"]))
class AdConfirmed(AbstractRetrieveUsers):
    model_class = Ad
    query_string = "confirmed_users"
