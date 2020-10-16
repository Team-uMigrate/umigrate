from django.shortcuts import render
from .models import PhotoCollectionMember
from .serializers import PhotoCollectionMemberSerializer
from rest_framework.generics import CreateAPIView


class ImageCreate(CreateAPIView):
    queryset = PhotoCollectionMember.objects.all()
    serializer_class = PhotoCollectionMemberSerializer
