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


USER_COUNT = 120
ITEM_COUNT = 120


def random_users(users, max_users=3, min_users=0, total_users=USER_COUNT):
    num_of_users = random.randint(min_users, max_users)
    list_of_ids = []
    for i in range(num_of_users):
        list_of_ids = list_of_ids + [random.randint(1, total_users)]
    return users.filter(id__in=list_of_ids)


class Command(BaseCommand):
    help = "Creates test data for the db"

    def add_arguments(self, parser):
        parser.add_argument(
            "-e", "--email", type=str, help="Specify your uwaterloo email"
        )
        parser.add_argument(
            "-f", "--firstname", type=str, help="Specify your first name"
        )
        parser.add_argument("-l", "--lastname", type=str, help="Specify your last name")
        parser.add_argument(
            "-p", "--preferredname", type=str, help="Specify your last name"
        )

    def handle(self, *args, **options):
        email = options["email"]
        first_name = options["firstname"]
        last_name = options["lastname"]
        preferred_name = options["preferredname"]

        start_time = datetime.now()
        print("Task begin!")

        print("Creating your account...")
        UserFactory(
            email=email,
            first_name=first_name,
            last_name=last_name,
            preferred_name=preferred_name,
            connected_users=[],
            blocked_users=[],
        )

        print("Creating users...")
        UserFactory.create_batch(USER_COUNT - 1, connected_users=[], blocked_users=[])
        users = CustomUser.objects.all()

        print("Assigning connected and blocked users...")
        for user in users:
            connect_users = random_users(users)
            blocked_users = random_users(users)
            for a in connect_users:
                user.connected_users.add(a)
            for b in blocked_users:
                user.blocked_users.add(b)

        print(f"Creating {ITEM_COUNT} items...")
        for i in range(ITEM_COUNT):
            rand_int1 = random.randint(0, 12)
            rand_int2 = random.randint(0, 12)

            ad = AdFactory(
                liked_users=random_users(users),
                tagged_users=random_users(users),
                saved_users=random_users(users),
                creator=users.get(id=random.randint(1, USER_COUNT)),
                contacted_users=random_users(users),
                confirmed_users=random_users(users),
            )

            event = EventFactory(
                liked_users=random_users(users),
                tagged_users=random_users(users),
                saved_users=random_users(users),
                creator=users.get(id=random.randint(1, USER_COUNT)),
                interested_users=random_users(users),
                attending_users=random_users(users),
            )

            job = JobFactory(creator=users.get(id=random.randint(1, USER_COUNT)))

            listing = ListingFactory(
                liked_users=random_users(users),
                tagged_users=random_users(users),
                saved_users=random_users(users),
                creator=users.get(id=random.randint(1, USER_COUNT)),
                contacted_users=random_users(users),
                confirmed_users=random_users(users),
            )

            room = RoomFactory(
                members=random_users(users),
            )

            for j in range(rand_int1):
                message = MessageFactory(
                    liked_users=random_users(users),
                    tagged_users=random_users(users),
                    creator=users.get(id=random.randint(1, USER_COUNT)),
                    room=room,
                )

            poll = PollFactory(
                liked_users=random_users(users),
                tagged_users=random_users(users),
                saved_users=random_users(users),
                creator=users.get(id=random.randint(1, USER_COUNT)),
            )

            for m in range(rand_int2):
                option = OptionFactory(
                    creator=users.get(id=random.randint(1, USER_COUNT)), poll=poll
                )

                for n in range(rand_int1):
                    vote = VoteFactory(
                        creator=users.get(id=random.randint(1, USER_COUNT)),
                        option=option,
                    )

            post = PostFactory(
                liked_users=random_users(users),
                tagged_users=random_users(users),
                saved_users=random_users(users),
                creator=users.get(id=random.randint(1, USER_COUNT)),
            )

            postings = [ad, event, listing, poll, post]

            for x in range(rand_int1):
                comment = CommentFactory(
                    liked_users=random_users(users),
                    tagged_users=random_users(users),
                    saved_users=random_users(users),
                    creator=users.get(id=random.randint(1, USER_COUNT)),
                    content_object=postings[random.randint(0, len(postings) - 1)],
                )

                for y in range(rand_int2):
                    reply = ReplyFactory(
                        liked_users=random_users(users),
                        tagged_users=random_users(users),
                        saved_users=random_users(users),
                        creator=users.get(id=random.randint(1, USER_COUNT)),
                        comment=comment,
                    )

            if (i + 1) % 10 == 0:
                print(f"{i + 1} items created...")

        end_time = datetime.now()
        time_diff = end_time - start_time
        total_seconds = time_diff.total_seconds()
        print(
            f"Task complete after {total_seconds // 60} min and {total_seconds // 1 % 60} seconds!"
        )
