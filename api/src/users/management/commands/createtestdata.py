from django.core.management.base import BaseCommand, CommandError
import random
from ads.factories import AdFactory
from comments.factories import CommentFactory, ReplyFactory
from events.factories import EventFactory
from jobs.factories import JobFactory
from listings.factories import ListingFactory
from messaging.factories import RoomFactory, MessageFactory
from polls.factories import PollFactory, OptionFactory, VoteFactory
from posts.factories import PostFactory
from users.factories import UserFactory, CustomUser
from datetime import datetime


class Command(BaseCommand):
    help = 'Creates test data for the db'

    def add_arguments(self, parser):
        parser.add_argument('-e', '--email', type=str, help='Specify your uwaterloo email')
        parser.add_argument('-f', '--firstname', type=str, help='Specify your first name')
        parser.add_argument('-l', '--lastname', type=str, help='Specify your last name')
        parser.add_argument('-p', '--preferredname', type=str, help='Specify your last name')

    def handle(self, *args, **options):
        email = options['email']
        first_name = options['firstname']
        last_name = options['lastname']
        preferred_name = options['preferredname']

        starttime = datetime.now()
        print('Task begin!')

        print('Creating your account...')
        user = UserFactory(email=email, first_name=first_name, last_name=last_name, preferred_name=preferred_name)
        exclude_list = [user.id]

        num = 20
        for i in range(num):
            print(f'Iteration {i} out of {num}')

            post = PostFactory()
            creator = post.creator
            exclude_list = exclude_list + [creator.id]
            liked_users = post.liked_users.all()
            tagged_users = post.tagged_users.all()
            saved_users = post.saved_users.all()

            print('Creating ads...')
            AdFactory.create_batch(5, liked_users=liked_users, tagged_users=tagged_users, saved_users=saved_users,
                                   creator=creator)
            print('Creating comments...')
            CommentFactory.create_batch(5, liked_users=liked_users, tagged_users=tagged_users, saved_users=saved_users,
                                        creator=creator)
            print('Creating replies...')
            ReplyFactory.create_batch(5, liked_users=liked_users, tagged_users=tagged_users, saved_users=saved_users,
                                      creator=creator)
            print('Creating events...')
            EventFactory.create_batch(5, liked_users=liked_users, tagged_users=tagged_users, saved_users=saved_users,
                                      creator=creator, interested_users=liked_users, attending_users=saved_users)
            print('Creating jobs...')
            JobFactory.create_batch(5, creator=creator)
            print('Creating listings...')
            ListingFactory.create_batch(5, liked_users=liked_users, tagged_users=tagged_users, saved_users=saved_users,
                                        creator=creator)
            print('Creating rooms...')
            RoomFactory.create_batch(5, members=saved_users, creator=creator)
            print('Creating messages...')
            MessageFactory.create_batch(5, liked_users=liked_users, tagged_users=tagged_users, creator=creator)
            print('Creating polls...')
            PollFactory.create_batch(5, liked_users=liked_users, tagged_users=tagged_users, saved_users=saved_users,
                                     creator=creator)
            print('Creating options...')
            OptionFactory.create_batch(5, creator=creator)
            print('Creating votes...')
            VoteFactory.create_batch(5, creator=creator)
            print('Creating posts...')
            PostFactory.create_batch(5, liked_users=liked_users, tagged_users=tagged_users, saved_users=saved_users,
                                     creator=creator)

        users = CustomUser.objects.exclude(id__in=exclude_list)
        total_count = users.count()
        print(f'Deleting {total_count - 1000} excess users...')

        while total_count > 1000:
            rand_int = random.randint(0, total_count - 1)
            delete_user = users[rand_int]
            users = users.exclude(id=delete_user.id)
            delete_user.delete()
            total_count = total_count - 1

            if total_count % 100 == 0:
                print(f'{total_count - 1000} users left to delete...')

        endtime = datetime.now()
        timediff = endtime - starttime
        total_seconds = timediff.total_seconds()
        print(f'Task complete after {total_seconds // 60} min and {total_seconds // 1 % 60} seconds!')
