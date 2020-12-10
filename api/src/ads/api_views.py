from common.abstract_api_views import (
    AbstractModelViewSet,
    AbstractSavedView,
    AbstractLikedUsers,
)
from common.generics.generic_post_api_views import GenericUserExtension
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
    search_fields = [
        "title",
    ]


# HTTP GET: Returns a list of likes on an ad
# HTTP POST: Like or unlike an ad
@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Ads"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Ads"]))
class LikedAd(AbstractSavedView):
    query_string = "liked_ads"
    serializer_class = AdSerializer
    model_class = Ad


# HTTP GET: Returns a list of liked users that liked a ads
@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Ads"]))
class AdLikes(AbstractLikedUsers):
    model_class = Ad
