from django.core.exceptions import ObjectDoesNotExist
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .generic_post_models import IsCreatorOrReadOnly
from users.serializers import BasicUserSerializer


# HTTP GET: Returns a list of generic resource
# HTTP POST: Creates a generic resource
class GenericPostListCreate(ListCreateAPIView):
    # Override required for queryset; it should be a model query
    queryset = None
    # Override required for serializer_class and detail_serializer_class; both it should be a model serializer class
    serializer_class = None
    detail_serializer_class = None
    permission_classes = [
        IsAuthenticated,
        IsCreatorOrReadOnly,
    ]
    filter_backends = [DjangoFilterBackend, SearchFilter]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return self.detail_serializer_class
        return self.serializer_class


# HTTP GET: Returns a generic resource
# HTTP PUT: Updates a generic resource
# HTTP PATCH: Partially updates a generic resource
# HTTP DELETE: Deletes a generic resource
class GenericPostRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    # Override required for queryset; it should be a model query
    queryset = None
    # Override required for serializer_class and detail_serializer_class; both it should be a model serializer class
    serializer_class = None
    detail_serializer_class = None
    permission_classes = [
        IsAuthenticated,
        IsCreatorOrReadOnly,
    ]
    lookup_field = 'id'

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return self.detail_serializer_class
        return self.serializer_class


# HTTP GET: Gets a user from a related field on a model
# HTTP POST: Adds or removes a user from a related field on a model
class GenericUserExtension(APIView):
    # Override required for field_string; it should be a string for the field in the request
    field_string = None
    # Override required for field_func; it should be a related field for a model instance
    field_func = None
    users_func = None
    # Override required for serializer when users_func is None
    serializer = None
    permission_classes = [
        IsAuthenticated,
    ]
    tag = None

    def get(self, request, *args, **kwargs):
        try:
            if self.users_func is None:
                obj_id = int(request.query_params['id'])
                serializer = BasicUserSerializer(self.field_func(obj_id=obj_id).all(), many=True,
                                                 context={'request': request})
            else:
                serializer = self.serializer(self.users_func(user_id=self.request.user.id).all(), many=True,
                                                 context={'request': request})
            return Response(serializer.data)
        except ObjectDoesNotExist:
            return Response({'detail': 'Item does not exist'}, status=status.HTTP_404_NOT_FOUND)
        except KeyError:
            return Response({'detail': 'Missing id query parameter'})

    def post(self, request, *args, **kwargs):
        error_response = self.validate_data(request.data)
        if error_response != {}:
            return Response(error_response, status=status.HTTP_400_BAD_REQUEST)

        add_user = request.data[self.field_string]
        obj_id = request.data['id']

        try:
            if add_user:
                self.field_func(obj_id=obj_id).add(request.user.id)

            else:
                self.field_func(obj_id=obj_id).remove(request.user.id)

            return Response({self.field_string: add_user, 'id': obj_id})

        except ObjectDoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

    def validate_data(self, data):
        response = {}

        if self.field_string not in data.keys():
            response.update({self.field_string: ['This field is required']})

        elif not isinstance(data[self.field_string], bool):
            response.update({self.field_string: ['Must be a bool']})

        if 'id' not in data.keys():
            response.update({'id': ['This field is required']})

        elif not isinstance(data['id'], int):
            response.update({'id': ['Must be a positive int']})

        return response
