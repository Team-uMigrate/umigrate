from jobs.models import Job
from messaging.models import Room, Message
from datetime import date, timedelta


# Create room instances
def create_rooms(num):
    for i in range(num):
        room = Room.objects.create(
            title=f"Room {i}",
        )
        room.members.add(1)
        room.save()


# Create message instances
def create_messages(num):
    for i in range(num):
        message = Message.objects.create(
            content=f"Message {i}",
            creator_id=1,
            room_id=1,
        )
        message.save()


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
            city="Waterloo",
        )
        job.save()
