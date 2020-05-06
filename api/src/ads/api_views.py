from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy, GenericPostCommentListCreate
from .models import Ad, AdComment
from .serializers import AdSerializer, AdCommentSerializer


# HTTP GET: Returns a list of ads
# HTTP POST: Creates an ad
class AdListCreate(GenericPostListCreate):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer


# HTTP GET: Returns an ad
# HTTP PUT: Updates an ad
# HTTP PATCH: Partially updates an ad
# HTTP DELETE: Deletes an ad
class AdRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer


# HTTP GET: Returns a list of ad comments for the ad with the ID that matches the ID in the URL
# HTTP POST: Creates an ad comment for the ad with the ID that matches the ID in the URL
class AdCommentListCreate(GenericPostCommentListCreate):
    queryset = AdComment.objects.all()
    serializer_class = AdCommentSerializer
    parent_string = 'ad'


# HTTP GET: Returns an ad comment
# HTTP PUT: Updates an ad comment
# HTTP PATCH: Partially updates an ad comment
# HTTP DELETE: Deletes an ad comment
class AdCommentRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = AdComment.objects.all()
    serializer_class = AdCommentSerializer
