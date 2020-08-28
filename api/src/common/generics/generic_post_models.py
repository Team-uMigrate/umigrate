from django.db import models
from users.models import CustomUser
from notifications.models import Notification
from common.constants.choices import Choices
from common.generics.generic_models import GenericModel
from rest_framework.permissions import BasePermission, SAFE_METHODS
from asgiref.sync import async_to_sync
from django.db.models.signals import post_save


# General post_save function
def post_comment_post_save(sender, instance, created, **kwargs):
    if created:
        # hardcoded truncated length 100
        posting = getattr(instance, instance.posting_type)
        notification = Notification.objects.create(
            title=(instance.creator.preferred_name + ' commented on your post!'),
            description=(instance.creator.preferred_name + ' commented, ' + instance.comment_body)[:100],
            region=posting.region
        )
        notification.members.set([posting.creator])
        #async_to_sync(Notification.send_through_websocket)(notification, user_channel=posting.creator.id)


def post_post_save(sender, instance, created, **kwargs):
    if created:
        # we really spamming notifications for every post huh
        users = CustomUser.objects.exclude(id=instance.creator.id).filter(region=instance.region)
        if len(users) > 0:
            notification = Notification.objects.create(
                title=(instance.creator.preferred_name + ' made a post!'),
                description='read it or something?',
                region=instance.region
            )
            for user in users:
                notification.members.add(user)

            #async_to_sync(Notification.send_through_websocket)(notification, region=instance.region)


# A custom permission that only allows the creator of a resource to modify or delete it
class IsCreatorOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.creator_id == request.user.id


# An abstract model that represents a generic post object
class GenericPostModel(GenericModel):
    creator = models.ForeignKey(to=CustomUser, related_name="%(app_label)s_%(class)s_set", on_delete=models.CASCADE)
    liked_users = models.ManyToManyField(to=CustomUser, related_name="liked_%(app_label)s_%(class)s_comment_set", blank=True)
    tagged_users = models.ManyToManyField(to=CustomUser, related_name="tagged_%(app_label)s_%(class)s_comment_set", blank=True)

    class Meta:
        abstract = True
        ordering = ['-datetime_created']

    @classmethod
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        post_save.connect(post_post_save, cls)


# An abstract model that represents a generic comment object
class GenericCommentModel(models.Model):
    # Override posting_type with a lowercase string of the posting type
    posting_type = None

    id = models.AutoField(primary_key=True)
    comment_body = models.TextField(max_length=1000)
    creator = models.ForeignKey(to=CustomUser, related_name="%(app_label)s_%(class)s_comment_set", on_delete=models.CASCADE)
    datetime_created = models.DateTimeField(auto_now_add=True)
    liked_users = models.ManyToManyField(to=CustomUser, related_name="liked_%(app_label)s_%(class)s_comment_set", blank=True)
    tagged_users = models.ManyToManyField(to=CustomUser, related_name="tagged_%(app_label)s_%(class)s_comment_set", blank=True)

    class Meta:
        ordering = ['-datetime_created']
        abstract = True

    def __str__(self):
        return f'{self.comment_body}'

    @classmethod
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        post_save.connect(post_comment_post_save, cls)
