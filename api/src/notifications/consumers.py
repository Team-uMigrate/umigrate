from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async
from django.core.exceptions import ObjectDoesNotExist
import json
from .models import Notification
from users.models import CustomUser


# Handles websocket connections for notifications 
class NotificationConsumer(AsyncWebsocketConsumer):
    user = None
    region_channel_name = None
    user_channel_name = None

    # connects to notification channels
    async def connect(self):
        try:
            get_user_id = sync_to_async(lambda: self.scope['session']['user_id'])
            user_id = await get_user_id()
            get_user = database_sync_to_async(lambda: CustomUser.get(id=user_id))
            user = await get_user()
            self.user = user.__dict__

            # connect to region channel
            self.region_channel_name = Notification.get_region_channel_name(user['region'])
            await self.channel_layer.group_add(
                self.region_channel_name,
                self.channel_name
            )
            self.groups.append(self.region_channel_name)

            # connect to user channel
            self.user_channel_name = Notification.get_user_channel_name(user['id'])
            await self.channel_layer.group_add(
                self.user_channel_name,
                self.channel_name
            )
            self.groups.append(self.user_channel_name)

            # accept connection
            await self.accept()

            # load all unread notifications
            notifications = Notification.objects.filter(members__id=user_id)
            for notification in notifications:
                Notification.send_through_websocket(notification, user_id=user_id) # only loads user notifs? or loads all as user notifs?

        except ObjectDoesNotExist:
            pass

    async def notify(self, event):
        await self.send_json(event["notification"])

    async def receive(self, content, **kwargs):
        get_user_id = sync_to_async(lambda: self.scope['session']['user_id'])
        user_id = await get_user_id()
        if self.user['id'] == user_id:
            # remove self from notification

            pass
