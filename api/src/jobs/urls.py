from django.urls import path
from .api_views import JobListCreate, JobRetrieveUpdateDestroy, SavedJob


# Posts url patterns
urlpatterns = [
    path("users/jobs/", JobListCreate.as_view()),
    path("users/jobs/<int:id>", JobRetrieveUpdateDestroy.as_view()),
    path("users/jobs/save", SavedJob.as_view()),
]
