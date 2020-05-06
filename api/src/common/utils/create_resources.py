from ads.models import Ad, AdComment
from events.models import Event, EventComment
from housing.models import Housing, HousingComment
from polls.models import Poll, PollComment, Option, Vote
from posts.models import Post, PostComment
from datetime import datetime, timedelta


# Creates ad instances
def create_ads(num):
    for i in range(num):
        ad = Ad.objects.create(
            title=f'Ad {i}',
            description=f'This is Ad {i}',
            region=0,
            creator_id=1,
            category=0,
            features='There are a lot of features',
            price=123.45,
        )
        ad.save()


# Creates ad comment instances
def create_ad_comments(num):
    for i in range(num):
        ad_comment = AdComment.objects.create(
            comment_body=f'Comment {i}',
            ad_id=1,
            creator_id=1,
        )
        ad_comment.save()


# Creates event instances
def create_events(num):
    for i in range(num):
        event = Event.objects.create(
            title=f'Event {i}',
            description=f'This is Event {i}',
            region=0,
            creator_id=1,
            price=123.45,
            start_datetime=datetime.now(),
            end_datetime=datetime.today() + timedelta(days=1),
            street_address='123 King street',
            city='Waterloo',
            division='Ontario',
            country='Canada',
        )
        event.save()


# Creates event comment instances
def create_event_comments(num):
    for i in range(num):
        event_comment = EventComment.objects.create(
            comment_body=f'Comment {i}',
            event_id=1,
            creator_id=1,
        )
        event_comment.save()


# Creates housing instances
def create_housing(num):
    for i in range(num):
        housing = Housing.objects.create(
            title=f'Housing {i}',
            description=f'This is Housing post {i}',
            region=0,
            creator_id=1,
            category=0,
            features='There are a lot of features',
            price=123.45,
            street_address='123 King street',
            city='Waterloo',
            division='Ontario',
            country='Canada',
            term=0,
        )
        housing.save()


# Creates housing comment instances
def create_housing_comments(num):
    for i in range(num):
        housing_comment = HousingComment.objects.create(
            comment_body=f'Comment {i}',
            housing_id=1,
            creator_id=1,
        )
        housing_comment.save()


# Creates poll instances
def create_polls(num):
    for i in range(num):
        poll = Poll.objects.create(
            title=f'Poll {i}',
            description=f'This is Poll {i}',
            region=0,
            creator_id=1,
        )
        poll.save()


# Creates poll comment instances
def create_poll_comments(num):
    for i in range(num):
        poll_comment = PollComment.objects.create(
            comment_body=f'Comment {i}',
            poll_id=1,
            creator_id=1,
        )
        poll_comment.save()


# Creates option instances
def create_options(num):
    for i in range(num):
        option = Option.objects.create(
            description=f'This is Option {i}',
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
            description=f'This is Post {i}',
            region=0,
            creator_id=1,
        )
        post.save()


# Creates post comment instances
def create_post_comments(num):
    for i in range(num):
        post_comment = PostComment.objects.create(
            comment_body=f'Comment {i}',
            post_id=1,
            creator_id=1,
        )
        post_comment.save()
