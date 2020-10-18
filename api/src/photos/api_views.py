from django.shortcuts import render
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from .models import PhotoCollectionMember
from .serializers import PhotoCollectionMemberSerializer
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView


# HTTP POST: Creates an image
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['upload']))
class ImageCreate(CreateAPIView):
    queryset = PhotoCollectionMember.objects.all()
    serializer_class = PhotoCollectionMemberSerializer


# HTTP GET: Returns an image
# HTTP PUT: Updates an image
# HTTP PATCH: Partially updates an image
# HTTP DELETE: Deletes an image
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['upload']))
@method_decorator(name='put', decorator=swagger_auto_schema(tags=['upload']))
@method_decorator(name='patch', decorator=swagger_auto_schema(tags=['upload']))
@method_decorator(name='delete', decorator=swagger_auto_schema(tags=['upload']))
class ImageRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = PhotoCollectionMember.objects.all()
    serializer_class = PhotoCollectionMemberSerializer
    lookup_field = 'id'
