from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from common.generics.generic_post_api_views import GenericCommentListCreate, GenericCommentRetrieveUpdateDestroy
from .models import Job
from .serializers import JobSerializer
from drf_yasg.utils import swagger_auto_schema


# HTTP GET: Returns a list of job posts for the user with the ID that matches the ID in the URL
# HTTP POST: Creates a job post for the user with the ID that matches the ID in the URL
class JobListCreate(GenericCommentListCreate):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    parent_string = 'creator'
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filter_fields = ['datetime_created', 'job_type', 'start_date', 'end_date', ]
    search_fields = ['position', 'company', ]

    @swagger_auto_schema(tags=['Jobs'])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Jobs'])
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


# HTTP GET: Returns a job post
# HTTP PUT: Updates a job post
# HTTP PATCH: Partially updates a job post
# HTTP DELETE: Deletes a job post
class JobRetrieveUpdateDestroy(GenericCommentRetrieveUpdateDestroy):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    parent_string = 'creator'

    @swagger_auto_schema(tags=['Jobs'])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Jobs'])
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Jobs'])
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    @swagger_auto_schema(tags=['Jobs'])
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)
