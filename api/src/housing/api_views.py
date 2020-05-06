from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy, GenericPostCommentListCreate
from .models import Housing, HousingComment
from .serializers import HousingSerializer, HousingCommentSerializer


# HTTP GET: Returns a list of housing posts
# HTTP POST: Creates a housing post
class HousingListCreate(GenericPostListCreate):
    queryset = Housing.objects.all()
    serializer_class = HousingSerializer


# HTTP GET: Returns a housing post
# HTTP PUT: Updates a housing post
# HTTP PATCH: Partially updates a housing post
# HTTP DELETE: Deletes a housing post
class HousingRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = Housing.objects.all()
    serializer_class = HousingSerializer


# HTTP GET: Returns a list of housing comments for the housing post with the ID that matches the ID in the URL
# HTTP POST: Creates a housing comment for the housing post with the ID that matches the ID in the URL
class HousingCommentListCreate(GenericPostCommentListCreate):
    queryset = HousingComment.objects.all()
    serializer_class = HousingCommentSerializer
    parent_string = 'housing'


# HTTP GET: Returns a housing comment
# HTTP PUT: Updates a housing comment
# HTTP PATCH: Partially updates a housing comment
# HTTP DELETE: Deletes a housing comment
class HousingCommentRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = HousingComment.objects.all()
    serializer_class = HousingCommentSerializer
