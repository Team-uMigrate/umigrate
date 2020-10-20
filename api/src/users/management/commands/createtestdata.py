import random
from datetime import datetime
from django.core.management.base import BaseCommand
from ads.factories import AdFactory
from comments.factories import CommentFactory, ReplyFactory
from events.factories import EventFactory
from jobs.factories import JobFactory
from listings.factories import ListingFactory
from messaging.factories import RoomFactory, MessageFactory
from polls.factories import PollFactory, OptionFactory, VoteFactory
from posts.factories import PostFactory
from users.factories import UserFactory, CustomUser

USER_COUNT = 100
ITEM_COUNT = 100


def random_users(max_users=3, min_users=0, total_users=USER_COUNT):
    num_of_users = random.randint(min_users, max_users)
    list_of_ids = []
    for i in range(num_of_users):
        list_of_ids = list_of_ids + [random.randint(1, total_users)]
    return CustomUser.objects.filter(id__in=list_of_ids)


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

        start_time = datetime.now()
        print('Task begin!')

        print('Creating your account...')
        UserFactory(email=email, first_name=first_name, last_name=last_name, preferred_name=preferred_name,
                    connected_users=[], blocked_users=[])

        print('Creating users...')
        UserFactory.create_batch(USER_COUNT - 1, connected_users=[], blocked_users=[])
        users = CustomUser.objects.all()

        print('Assigning connected and blocked users...')
        for user in users:
            connect_users = random_users()
            blocked_users = random_users()
            for i in connect_users:
                user.connected_users.add(i)
            for j in blocked_users:
                user.blocked_users.add(j)

        print(f'Creating {ITEM_COUNT} items...')
        for i in range(ITEM_COUNT):
            AdFactory(liked_users=random_users(), tagged_users=random_users(), 
                      saved_users=random_users(), creator=users.get(id=random.randint(1, USER_COUNT)))

            # CommentFactory(liked_users=random_users(), tagged_users=random_users(),
            #                saved_users=random_users(), creator=users.get(id=random.randint(1, USER_COUNT)))
            #
            # ReplyFactory(liked_users=random_users(), tagged_users=random_users(),
            #              saved_users=random_users(), creator=users.get(id=random.randint(1, USER_COUNT)))

            EventFactory(liked_users=random_users(), tagged_users=random_users(),
                         saved_users=random_users(), creator=users.get(id=random.randint(1, USER_COUNT)),
                         interested_users=random_users(), attending_users=random_users())

            JobFactory(creator=users.get(id=random.randint(1, USER_COUNT)))

            ListingFactory(liked_users=random_users(), tagged_users=random_users(),
                           saved_users=random_users(), creator=users.get(id=random.randint(1, USER_COUNT)))

            RoomFactory(members=random_users(), creator=users.get(id=random.randint(1, USER_COUNT)))

            # MessageFactory(liked_users=random_users(), tagged_users=random_users(),
            #                creator=users.get(id=random.randint(1, USER_COUNT)))

            PollFactory(liked_users=random_users(), tagged_users=random_users(),
                        saved_users=random_users(), creator=users.get(id=random.randint(1, USER_COUNT)))

            # OptionFactory(creator=users.get(id=random.randint(1, USER_COUNT)))
            #
            # VoteFactory(creator=users.get(id=random.randint(1, USER_COUNT)))

            PostFactory(liked_users=random_users(), tagged_users=random_users(),
                        saved_users=random_users(), creator=users.get(id=random.randint(1, USER_COUNT)))

            if (i + 1) % 10 == 0:
                print(f'{i + 1} items created...')

        end_time = datetime.now()
        time_diff = end_time - start_time
        total_seconds = time_diff.total_seconds()
        print(f'Task complete after {total_seconds // 60} min and {total_seconds // 1 % 60} seconds!')
