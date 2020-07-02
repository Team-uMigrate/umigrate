from common.generics.generic_post_api_views import GenericPostListCreate, GenericPostRetrieveUpdateDestroy, \
    GenericCommentListCreate, GenericCommentRetrieveUpdateDestroy, GenericUserExtension
from .models import Housing, HousingComment
from .serializers import HousingSerializer, HousingCommentSerializer
from django_filters import rest_framework as filters
from housing.filters import HousingFilter


# HTTP GET: Returns a list of housing posts
# HTTP POST: Creates a housing post
class HousingListCreate(GenericPostListCreate):
    queryset = Housing.objects.all()
    serializer_class = HousingSerializer
    search_fields = ['title', 'features']
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = HousingFilter


# HTTP GET: Returns a housing post
# HTTP PUT: Updates a housing post
# HTTP PATCH: Partially updates a housing post
# HTTP DELETE: Deletes a housing post
class HousingRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = Housing.objects.all()
    serializer_class = HousingSerializer


# HTTP GET: Returns a list of housing comments for the housing post with the ID that matches the ID in the URL
# HTTP POST: Creates a housing comment for the housing post with the ID that matches the ID in the URL
class HousingCommentListCreate(GenericCommentListCreate):
    queryset = HousingComment.objects.all()
    serializer_class = HousingCommentSerializer
    parent_string = 'housing'


# HTTP GET: Returns a housing comment
# HTTP PUT: Updates a housing comment
# HTTP PATCH: Partially updates a housing comment
# HTTP DELETE: Deletes a housing comment
class HousingCommentRetrieveUpdateDestroy(GenericCommentRetrieveUpdateDestroy):
    queryset = HousingComment.objects.all()
    serializer_class = HousingCommentSerializer
    parent_string = 'housing'


# HTTP GET: Returns true or false if a user has liked a housing post
# HTTP POST: Like or unlike a housing post
class HousingLike(GenericUserExtension):
    response_string = 'liked'

    @staticmethod
    def field_func(obj_id):
        return Housing.objects.get(id=obj_id).liked_users


# HTTP GET: Returns true or false if a user has liked a housing comment
# HTTP POST: Like or unlike a housing post comment
class HousingCommentLike(GenericUserExtension):
    response_string = 'liked'

    @staticmethod
    def field_func(obj_id):
        return HousingComment.objects.get(id=obj_id).liked_users
