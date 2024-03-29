from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.core.exceptions import ObjectDoesNotExist
import json
from .utils import receive_message, receive_like
from .models import Room


class ChatConsumer(AsyncWebsocketConsumer):
    """
    Handles websocket connections for messaging.
    """

    room_id = None
    room_group_name = None
    member = None
    room = None
    user = None

    async def connect(self):
        """
        Creates a group or enters and existing one.
        """

        self.room_id = int(self.scope["url_route"]["kwargs"]["room_id"])
        self.room_group_name = "chat_%s" % str(self.room_id)

        try:
            user_id = self.scope["user"].id
            self.room = await database_sync_to_async(
                lambda: Room.objects.get(id=self.room_id)
            )()
            self.user = await database_sync_to_async(
                lambda: self.room.members.get(id=user_id)
            )()
            self.member = self.user.__dict__

            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
            await self.accept()
        except ObjectDoesNotExist:
            pass

    async def disconnect(self, close_code):
        """
        Leaves a group.
        """

        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data=None, byte_data=None):
        """
        Receive a message from a websocket.
        """

        text_data_json = json.loads(text_data)
        user_id = self.scope["user"].id
        if self.member["id"] == user_id:
            event = None
            if text_data_json["type"] == "send_message":
                text_data_json["member_id"] = self.member["id"]
                text_data_json["first_name"] = self.member["first_name"]
                text_data_json["last_name"] = self.member["last_name"]
                text_data_json["preferred_name"] = self.member["preferred_name"]
                text_data_json["creator_id"] = self.scope["user"].id
                text_data_json["room_id"] = self.room_id
                text_data_json["user"] = self.user
                text_data_json["room"] = self.room

                event = await receive_message(text_data_json)
            elif text_data_json["type"] == "send_like":
                text_data_json["user_id"] = self.scope["user"].id
                text_data_json["user"] = self.user

                event = await receive_like(text_data_json)
            if event is not None:
                await self.channel_layer.group_send(self.room_group_name, event)
        else:
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name,
            )

    async def send_like(self, event):
        """
        Sends a received message to the group.
        """

        data = {
            "message_id": event["message_id"],
            "like": event["like"],
            "user_id": event["user_id"],
        }
        await self.send_data(data)

    async def send_message(self, event):
        """
        Sends a received like to the group.
        """

        data = {
            "id": event["id"],
            "message_body": event["message_body"],
            "creator": event["creator"],
            "previous_message": event["previous_message"],
            "datetime_created": event["datetime_created"],
            "tagged_users": event["tagged_users"],
            "content_type": event["content_type"],
            "object_id": event["object_id"],
        }
        await self.send_data(data)

    async def send_data(self, data: dict) -> None:
        """
        Sends data to the group.
        """

        if self.member["id"] == self.scope["user"].id:
            await self.send(text_data=json.dumps(data))
        else:
            await self.channel_layer.group_discard(
                self.room_group_name, self.channel_name
            )
