from django.db import models
from users.models import CustomUser
from common.constants.choices import Choices
from datetime import datetime


# Represents a job object
class Job(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.CharField(max_length=1000, blank=True)
    creator = models.ForeignKey(
        to=CustomUser,
        related_name="jobs",
        on_delete=models.CASCADE,
        blank=True,
    )
    datetime_created = models.DateTimeField(auto_now_add=True)
    position = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    job_type = models.PositiveSmallIntegerField(
        choices=Choices.JOB_TYPE_CHOICES, default=0
    )
    start_date = models.DateField(default=datetime.today)
    end_date = models.DateField(blank=True, null=True)
    location = models.CharField(max_length=100)

    class Meta:
        ordering = ["-datetime_created"]

    def __str__(self):
        return f"{str(self.creator)}: {self.position} at {self.company}"
