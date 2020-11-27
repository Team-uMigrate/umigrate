from django_filters.rest_framework import DjangoFilterBackend
from common.abstract_api_views import AbstractSavedView
from rest_framework.filters import SearchFilter
from common.generics.generic_post_api_views import (
    GenericPostListCreate,
    GenericPostRetrieveUpdateDestroy,
)
from .models import Job
from .serializers import JobSerializer
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


# HTTP GET: Returns a list of job posts for the user with the ID that matches the ID in the URL
# HTTP POST: Creates a job post for the user with the ID that matches the ID in the URL
@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Jobs"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Jobs"]))
class JobListCreate(GenericPostListCreate):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    detail_serializer_class = JobSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filter_fields = [
        "datetime_created",
        "job_type",
        "start_date",
        "end_date",
    ]
    search_fields = [
        "position",
        "company",
    ]


# HTTP GET: Returns a job post
# HTTP PUT: Updates a job post
# HTTP PATCH: Partially updates a job post
# HTTP DELETE: Deletes a job post
@method_decorator(name="get", decorator=swagger_auto_schema(tags=["Jobs"]))
@method_decorator(name="put", decorator=swagger_auto_schema(tags=["Jobs"]))
@method_decorator(name="patch", decorator=swagger_auto_schema(tags=["Jobs"]))
@method_decorator(name="delete", decorator=swagger_auto_schema(tags=["Jobs"]))
class JobRetrieveUpdateDestroy(GenericPostRetrieveUpdateDestroy):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    detail_serializer_class = JobSerializer


@method_decorator(name="list", decorator=swagger_auto_schema(tags=["Jobs"]))
@method_decorator(name="post", decorator=swagger_auto_schema(tags=["Jobs"]))
class SavedJob(AbstractSavedView):
    query_string = "saved_job_set"
    serializer_class = JobSerializer
    model_class = Job
