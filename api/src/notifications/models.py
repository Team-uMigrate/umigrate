from django.db import models
from users.models import CustomUser
from common.generics.generic_models import GenericModel
from channels.layers import get_channel_layer



def get_region_channel_name(region):
    return 'region_%s' % str(region)


def get_user_channel_name(user):
    return 'user_%s' % str(user)


async def send_through_websocket(notification, region=None, user_id=None):
    if region:
        channel_layer = get_channel_layer()
        group_name = get_region_channel_name(region)
        await channel_layer.group_send(group_name, {
            "type": "notify",
            "notification": notification.__dict__
        })
    elif user_id:
        channel_layer = get_channel_layer()
        user_channel = get_user_channel_name(user_id)
        await channel_layer.send(user_channel, {
            "type": "notify",
            "notification": notification.__dict__
        })


# represents a notification object
class Notification(GenericModel):
    members = models.ManyToManyField(to=CustomUser, related_name="notification_set")
