from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from .models import Photo
from .serializers import PhotoSerializer
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView


# HTTP POST: Creates an photo
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['uploads']))
class PhotoCreate(CreateAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


# HTTP GET: Returns an photo
# HTTP PUT: Updates an photo
# HTTP PATCH: Partially updates an photo
# HTTP DELETE: Deletes an photo
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['uploads']))
@method_decorator(name='put', decorator=swagger_auto_schema(tags=['uploads']))
@method_decorator(name='patch', decorator=swagger_auto_schema(tags=['uploads']))
@method_decorator(name='delete', decorator=swagger_auto_schema(tags=['uploads']))
class PhotoRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    lookup_field = 'id'
