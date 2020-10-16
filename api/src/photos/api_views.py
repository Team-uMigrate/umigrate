from django.shortcuts import render
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from .models import PhotoCollectionMember
from .serializers import PhotoCollectionMemberSerializer
from rest_framework.generics import CreateAPIView


# HTTP POST: Creates an image
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['upload']))
class ImageCreate(CreateAPIView):
    queryset = PhotoCollectionMember.objects.all()
    serializer_class = PhotoCollectionMemberSerializer
