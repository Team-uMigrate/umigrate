from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.core.exceptions import ObjectDoesNotExist
import json
from .models import Room, Message
from .receive import receive_message, receive_like


# Handles websocket connections for messaging
class ChatConsumer(AsyncWebsocketConsumer):
    room_id = None
    room_group_name = None
    member = None

    # Creates a group or enters and existing one
    async def connect(self):
        self.room_id = int(self.scope["url_route"]["kwargs"]["room_id"])
        self.room_group_name = "chat_%s" % str(self.room_id)

        try:
            user_id = self.scope["user"].id
            user = await database_sync_to_async(
                lambda: Room.objects.get(id=self.room_id).members.get(id=user_id)
            )()
            self.member = user.__dict__

            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
            await self.accept()
        except ObjectDoesNotExist:
            pass

    # Leaves a group
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive a message from a websocket
    async def receive(self, text_data=None, byte_data=None):
        text_data_json = json.loads(text_data)
        user_id = self.scope["user"].id
        if self.member["id"] == user_id:
            event = None
            if text_data_json["type"] == "send_message":
                event = await receive_message(self, text_data_json)
            elif text_data_json["type"] == "send_like":
                event = await receive_like(self, text_data_json)
            if event is not None:
                await self.channel_layer.group_send(self.room_group_name, event)
        else:
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name,
            )

    # Sends a received message to the group
    async def send_like(self, event):
        user_id = self.scope["user"].id

        if self.member["id"] == user_id:
            await self.send(
                text_data=json.dumps(
                    {
                        "message_id": event["message_id"],
                        "like": event["like"],
                        "user_id": event["user_id"],
                    }
                )
            )

        else:
            await self.channel_layer.group_discard(
                self.room_group_name, self.channel_name
            )

    async def send_message(self, event):
        user_id = self.scope["user"].id

        if self.member["id"] == user_id:
            await self.send(
                text_data=json.dumps(
                    {
                        "id": event["id"],
                        "message_body": event["message_body"],
                        "creator": event["creator"],
                        "previous_message": event["previous_message"],
                        "datetime_created": event["datetime_created"],
                        "tagged_users": event["tagged_users"],
                    }
                )
            )

        else:
            await self.channel_layer.group_discard(
                self.room_group_name, self.channel_name
            )
