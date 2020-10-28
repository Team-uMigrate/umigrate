from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView
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
    lookup_field = "id"
    lookup_value_regex = "(\\d+)"

    def get_serializer_class(self):
        if self.request.method == "GET":
            return self.detail_serializer_class
        return self.serializer_class

class AbstractSavedView(ListAPIView):
    queryset = None
    app_string = None 
    def get_queryset(self):
        #user.saved_posts_set.all()
        return getattr(self.request.user, f"saved_{app_string}_set").all()

    def post(self, request, *args, **kwargs):
        
        
        