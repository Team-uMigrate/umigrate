from django_filters.rest_framework import DjangoFilterBackend
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from common.abstract_models import IsCreatorOrReadOnly
from common.abstract_serializers import PostSaveSerializer


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
    # OVERRIDE!
    serializer_class = None
    model_class = None
    query_string = None

    permission_classes = [
        IsAuthenticated,
    ]

    def get_queryset(self):
        return getattr(self.request.user, self.query_string).all()

    def get_serializer_class(self):
        if self.request.method == "GET":
            return self.serializer_class
        return PostSaveSerializer

    def get(self, request, *args, **kwargs):
        return ListAPIView.get(self, request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = PostSaveSerializer(data=request.data)
        is_valid = serializer.is_valid()
        data = serializer.data
        if not is_valid:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        add_user = data["save"]
        obj_id = data["id"]

        try:
            obj = self.model_class.objects.get(id=obj_id)
            if add_user:
                obj.saved_users.add(request.user.id)
            else:
                obj.saved_users.remove(request.user.id)

            return Response({"save": add_user, "id": obj_id})

        except ObjectDoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
