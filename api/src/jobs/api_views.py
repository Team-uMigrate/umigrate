from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from common.generics.generic_post_api_views import GenericCommentListCreate, GenericCommentRetrieveUpdateDestroy
from .models import Job
from .serializers import JobSerializer
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


# HTTP GET: Returns a list of job posts for the user with the ID that matches the ID in the URL
# HTTP POST: Creates a job post for the user with the ID that matches the ID in the URL
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Jobs']))
@method_decorator(name='post', decorator=swagger_auto_schema(tags=['Jobs']))
class JobListCreate(GenericCommentListCreate):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    parent_string = 'creator'
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filter_fields = ['datetime_created', 'job_type', 'start_date', 'end_date', ]
    search_fields = ['position', 'company', ]


# HTTP GET: Returns a job post
# HTTP PUT: Updates a job post
# HTTP PATCH: Partially updates a job post
# HTTP DELETE: Deletes a job post
@method_decorator(name='get', decorator=swagger_auto_schema(tags=['Jobs']))
@method_decorator(name='put', decorator=swagger_auto_schema(tags=['Jobs']))
@method_decorator(name='patch', decorator=swagger_auto_schema(tags=['Jobs']))
@method_decorator(name='delete', decorator=swagger_auto_schema(tags=['Jobs']))
class JobRetrieveUpdateDestroy(GenericCommentRetrieveUpdateDestroy):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    parent_string = 'creator'
