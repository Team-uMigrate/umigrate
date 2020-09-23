from django.core.exceptions import ObjectDoesNotExist
from django.http import QueryDict
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .generic_post_models import IsCreatorOrReadOnly


# HTTP GET: Returns a list of generic resource
# HTTP POST: Creates a generic resource
class GenericPostListCreate(ListCreateAPIView):
    # Override required for queryset; it should be a model query
    queryset = None
    # Override required for serializer_class; it should be a model class
    serializer_class = None
    permission_classes = [
        IsAuthenticated,
        IsCreatorOrReadOnly,
    ]
    filter_backends = [DjangoFilterBackend, SearchFilter]

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
    # Override required for queryset; it should be a model query
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


# HTTP GET: Returns true or false if a user is a member of a related field on a model
# HTTP POST: Adds or removes a user from a related field on a model
class GenericUserExtension(APIView):
    # Override required for response_string; it should be a string for the field in the response
    response_string = None
    # Override required for field_func; it should be a related field for a model instance
    field_func = None
    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request, *args, **kwargs):
        try:
            if self.field_func(obj_id=kwargs['id']).filter(id=request.user.id):
                return Response({self.response_string: True})

            return Response({self.response_string: False})

        except ObjectDoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        try:
            add_user = request.data[self.response_string]
            assert(isinstance(add_user, bool))

            if add_user:
                self.field_func(obj_id=kwargs['id']).add(request.user.id)

            else:
                self.field_func(obj_id=kwargs['id']).remove(request.user.id)

            return Response({self.response_string: add_user})

        except KeyError:
            return Response({self.response_string: ['This field may not be blank.']}, status=status.HTTP_400_BAD_REQUEST)

        except AssertionError:
            return Response({self.response_string: ['This field must be have a boolean value.']}, status=status.HTTP_400_BAD_REQUEST)

        except ObjectDoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
