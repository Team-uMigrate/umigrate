from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from common.abstract_models import IsCreatorOrReadOnly


class AbstractModelViewSet(ModelViewSet):
    queryset = None
    serializer_class = None
    detail_serializer_class = None
    permission_classes = [
        IsAuthenticated,
        IsCreatorOrReadOnly,
    ]
    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
    ]
    lookup_value_regex = '[0-9]'

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return self.detail_serializer_class
        return self.serializer_class
