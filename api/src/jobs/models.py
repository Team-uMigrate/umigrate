from django.db import models
from common.generics.generic_models import GenericPhotoModel
from users.models import CustomUser
from common.constants.choices import Choices
from datetime import datetime


# Represents a job object
class Job(GenericPhotoModel):
    id = models.AutoField(primary_key=True)
    creator = models.ForeignKey(to=CustomUser, related_name="%(app_label)s_%(class)s_set", on_delete=models.CASCADE, blank=True)
    content = models.CharField(max_length=300, blank=True)
    datetime_created = models.DateTimeField(auto_now_add=True)
    photo = models.ImageField(upload_to='images/job_photos', blank=True)
    position = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    job_type = models.PositiveSmallIntegerField(choices=Choices.JOB_TYPE_CHOICES)
    start_date = models.DateField(default=datetime.today)
    end_date = models.DateField(blank=True, null=True)
    city = models.CharField(max_length=30)

    class Meta:
        
        
        
        ordering = ['-datetime_created']

    def __str__(self):
        return f'{self.position} at {self.company}'
