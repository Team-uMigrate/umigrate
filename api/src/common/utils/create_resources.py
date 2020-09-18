from ads.models import Ad, AdComment
from events.models import Event, EventComment
from listings.models import Listing, ListingComment
from jobs.models import Job
from messaging.models import Room, Message
from polls.models import Poll, PollComment, Option, Vote
from posts.models import Post, PostComment
from datetime import date, datetime, timedelta


# Creates ad instances
def create_ads(num):
    for i in range(num):
        ad = Ad.objects.create(
            title=f'Ad {i}',
            content=f'This is Ad {i}',
            region=0,
            creator_id=1,
            category=0,
            price=123.45,
        )
        ad.save()


# Creates ad comment instances
def create_ad_comments(num):
    for i in range(num):
        ad_comment = AdComment.objects.create(
            content=f'Comment {i}',
            ad_id=1,
            creator_id=1,
        )
        ad_comment.save()


# Creates event instances
def create_events(num):
    for i in range(num):
        event = Event.objects.create(
            title=f'Event {i}',
            content=f'This is Event {i}',
            region=0,
            creator_id=1,
            price_scale=0,
            start_datetime=datetime.now(),
            end_datetime=datetime.now() + timedelta(days=1),
        )
        event.save()


# Creates event comment instances
def create_event_comments(num):
    for i in range(num):
        event_comment = EventComment.objects.create(
            content=f'Comment {i}',
            event_id=1,
            creator_id=1,
        )
        event_comment.save()


# Creates listing instances
def create_listing(num):
    for i in range(num):
        listing = Listing.objects.create(
            title=f'listing {i}',
            content=f'This is listing post {i}',
            region=0,
            creator_id=1,
            category=0,
            price=123.45,
            season=0,
            year=2020,
        )
        listing.save()


# Creates listing comment instances
def create_listing_comments(num):
    for i in range(num):
        listing_comment = ListingComment.objects.create(
            content=f'Comment {i}',
            listing_id=1,
            creator_id=1,
        )
        listing_comment.save()


# Creates poll instances
def create_polls(num):
    for i in range(num):
        poll = Poll.objects.create(
            title=f'Poll {i}',
            content=f'This is Poll {i}',
            region=0,
            creator_id=1,
        )
        poll.save()


# Creates poll comment instances
def create_poll_comments(num):
    for i in range(num):
        poll_comment = PollComment.objects.create(
            content=f'Comment {i}',
            poll_id=1,
            creator_id=1,
        )
        poll_comment.save()


# Creates option instances
def create_options(num):
    for i in range(num):
        option = Option.objects.create(
            content=f'This is Option {i}',
            creator_id=1,
            poll_id=1
        )
        option.save()


# Creates vote instances
def create_votes(num):
    for i in range(num):
        vote = Vote.objects.create(
            option_id=1,
            creator_id=1,
        )
        vote.save()


# Creates post instances
def create_posts(num):
    for i in range(num):
        post = Post.objects.create(
            title=f'Post {i}',
            content=f'This is Post {i}',
            region=0,
            creator_id=1,
        )
        post.save()


# Creates post comment instances
def create_post_comments(num):
    for i in range(num):
        post_comment = PostComment.objects.create(
            content=f'Comment {i}',
            post_id=1,
            creator_id=1,
        )
        post_comment.save()


# Create room instances
def create_rooms(num):
    for i in range(num):
        room = Room.objects.create(
            title=f'Room {i}',
            creator_id=1,
            privacy_level=0,
        )
        room.members.add(1)
        room.save()


# Create message instances
def create_messages(num):
    for i in range(num):
        message = Message.objects.create(
            content=f'Message {i}',
            creator_id=1,
            room_id=1,
        )
        message.save()


# Create job instances
def create_jobs(num):
    for i in range(num):
        job = Job.objects.create(
            creator_id=1,
            position=f'Job {i}',
            company=f'Company {i}',
            job_type=0,
            start_date=date.today(),
            end_date=date.today() + timedelta(days=1),
            city='Waterloo',
        )
        job.save()
