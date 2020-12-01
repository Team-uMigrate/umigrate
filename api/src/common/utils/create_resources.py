from jobs.models import Job
from messaging.models import Room, Message
from datetime import date, timedelta


# Create job instances
def create_jobs(num):
    for i in range(num):
        job = Job.objects.create(
            creator_id=1,
            position=f"Job {i}",
            company=f"Company {i}",
            job_type=0,
            start_date=date.today(),
            end_date=date.today() + timedelta(days=1),
            location="Waterloo",
        )
        job.save()
