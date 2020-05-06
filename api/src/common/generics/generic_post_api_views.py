from django.http import QueryDict
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .generic_post_models import IsCreatorOrReadOnly


# HTTP GET: Returns a list of generic resource
# HTTP POST: Creates a generic resource
class GenericPostListCreate(ListCreateAPIView):
    # Override required for queryset; it should be a model class
    queryset = None
    # Override required for serializer_class; it should be a model class
    serializer_class = None
    permission_classes = [
        IsAuthenticated,
        IsCreatorOrReadOnly,
    ]

    def create(self, request, *args, **kwargs):
        if isinstance(request.data, QueryDict):
            request.data._mutable = True
        request.data['creator'] = request.user.id

        return ListCreateAPIView.create(self, request, *args, **kwargs)


# HTTP GET: Returns a generic resource
# HTTP PUT: Updates a generic resource
# HTTP PATCH: Partially updates a generic resource
# HTTP DELETE: Deletes a generic resource
class GenericPostRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    # Override required for queryset; it should be a model class
    queryset = None
    # Override required for serializer_class; it should be a model class
    serializer_class = None
    permission_classes = [
        IsAuthenticated,
        IsCreatorOrReadOnly,
    ]
    lookup_field = 'id'

    def update(self, request, *args, **kwargs):
        if isinstance(request.data, QueryDict):
            request.data._mutable = True
        request.data['creator'] = request.user.id

        return RetrieveUpdateDestroyAPIView.update(self, request, *args, **kwargs)


# HTTP GET: Returns a list of comments for the generic resource with the ID matching the ID in the URL
# HTTP POST: Creates a comment for the generic resource with the ID matching the ID in the URL
class GenericPostCommentListCreate(GenericPostListCreate):
    # Override require for parent_string; should be the name of the parent the comment is attached to (e.g. post)
    parent_string = None

    def list(self, request, *args, **kwargs):
        self.queryset = self.queryset.model.objects.filter(**{self.parent_string: kwargs['id']})
        return GenericPostListCreate.list(self, request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        if isinstance(request.data, QueryDict):
            request.data._mutable = True
        request.data[self.parent_string] = kwargs['id']

        return GenericPostListCreate.create(self, request, *args, **kwargs)
