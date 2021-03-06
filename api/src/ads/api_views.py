from common.abstract_api_views import (
    AbstractModelViewSet,
    AbstractAddRemoveUser,
    AbstractLikedUsers,
)
from .filters import AdFilterSet
from .models import Ad
from .serializers import AdSerializer, AdDetailSerializer
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


@method_decorator(name="list", decorator=swagger_auto_schema(tags=["Ads"]))
@method_decorator(name="create", decorator=swagger_auto_schema(tags=["Ads"]))
@method_decorator(name="retrieve", decorator=swagger_auto_schema(tags=["Ads"]))
@method_decorator(name="update", decorator=swagger_auto_schema(tags=["Ads"]))
@method_decorator(name="partial_update", decorator=swagger_auto_schema(tags=["Ads"]))
@method_decorator(name="destroy", decorator=swagger_auto_schema(tags=["Ads"]))
class AdViewSet(AbstractModelViewSet):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer
    detail_serializer_class = AdDetailSerializer
    filterset_class = AdFilterSet


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Ads"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Ads"]))
class LikedAds(AbstractAddRemoveUser):
    query_string = "liked_ads"
    serializer_class = AdSerializer
    model_class = Ad


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Ads"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Ads"]))
class SavedAds(AbstractAddRemoveUser):
    query_string = "saved_ads"
    serializer_class = AdSerializer
    model_class = Ad


@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Ads"]))
class AdLikes(AbstractLikedUsers):
    model_class = Ad
