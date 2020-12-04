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


def random_users(users, length, max_users=3, min_users=0):
    num_of_users = random.randint(min_users, max_users)
    list_of_ids = []
    for i in range(num_of_users):
        list_of_ids = list_of_ids + [random.randint(1, length)]
    return users.filter(id__in=list_of_ids)


class Command(BaseCommand):
    help = "Creates test data for the db"

    def add_arguments(self, parser):
        parser.add_argument("item_count", type=int)

    def handle(self, *args, **options):
        item_count = options["item_count"]

        start_time = datetime.now()
        print("Task begin!")

        print("Creating users...")
        UserFactory.create_batch(item_count, connected_users=[], blocked_users=[])
        users = CustomUser.objects.all()

        print("Assigning connected and blocked users...")
        for user in users:
            connect_users = random_users(users, item_count)
            blocked_users = random_users(users, item_count)
            for a in connect_users:
                user.connected_users.add(a)
            for b in blocked_users:
                user.blocked_users.add(b)

        print(f"Creating {item_count} items...")
        for i in range(item_count):
            rand_int1 = random.randint(0, 12)
            rand_int2 = random.randint(0, 12)

            ad = AdFactory(
                liked_users=random_users(users, item_count),
                tagged_users=random_users(users, item_count),
                saved_users=random_users(users, item_count),
                creator=users.get(id=random.randint(1, item_count)),
                contacted_users=random_users(users, item_count),
                confirmed_users=random_users(users, item_count),
            )

            event = EventFactory(
                liked_users=random_users(users, item_count),
                tagged_users=random_users(users, item_count),
                saved_users=random_users(users, item_count),
                creator=users.get(id=random.randint(1, item_count)),
                interested_users=random_users(users, item_count),
                attending_users=random_users(users, item_count),
            )

            job = JobFactory(creator=users.get(id=random.randint(1, item_count)))

            listing = ListingFactory(
                liked_users=random_users(users, item_count),
                tagged_users=random_users(users, item_count),
                saved_users=random_users(users, item_count),
                creator=users.get(id=random.randint(1, item_count)),
                contacted_users=random_users(users, item_count),
                confirmed_users=random_users(users, item_count),
            )

            room = RoomFactory(
                members=random_users(users, item_count),
            )

            for j in range(rand_int1):
                message = MessageFactory(
                    liked_users=random_users(users, item_count),
                    tagged_users=random_users(users, item_count),
                    creator=users.get(id=random.randint(1, item_count)),
                    room=room,
                )

            poll = PollFactory(
                liked_users=random_users(users, item_count),
                tagged_users=random_users(users, item_count),
                saved_users=random_users(users, item_count),
                creator=users.get(id=random.randint(1, item_count)),
            )

            for m in range(rand_int2):
                option = OptionFactory(
                    creator=users.get(id=random.randint(1, item_count)), poll=poll
                )

                for n in range(rand_int1):
                    vote = VoteFactory(
                        creator=users.get(id=random.randint(1, item_count)),
                        option=option,
                    )

            post = PostFactory(
                liked_users=random_users(users, item_count),
                tagged_users=random_users(users, item_count),
                saved_users=random_users(users, item_count),
                creator=users.get(id=random.randint(1, item_count)),
            )

            postings = [ad, event, listing, poll, post]

            for x in range(rand_int1):
                comment = CommentFactory(
                    liked_users=random_users(users, item_count),
                    tagged_users=random_users(users, item_count),
                    saved_users=random_users(users, item_count),
                    creator=users.get(id=random.randint(1, item_count)),
                    content_object=postings[random.randint(0, len(postings) - 1)],
                )

                for y in range(rand_int2):
                    reply = ReplyFactory(
                        liked_users=random_users(users, item_count),
                        tagged_users=random_users(users, item_count),
                        saved_users=random_users(users, item_count),
                        creator=users.get(id=random.randint(1, item_count)),
                        comment=comment,
                    )

            if (i + 1) % 10 == 0:
                print(f"\n{i + 1} items created...\n")

        end_time = datetime.now()
        time_diff = end_time - start_time
        total_seconds = time_diff.total_seconds()
        print(
            f"Task complete after {total_seconds // 60} min and {total_seconds // 1 % 60} seconds!"
        )
