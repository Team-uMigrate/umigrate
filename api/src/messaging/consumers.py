from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.core.exceptions import ObjectDoesNotExist
import json
from .models import Room, Message


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
            get_user = database_sync_to_async(
                lambda: Room.objects.get(id=self.room_id).members.get(id=user_id)
            )
            user = await get_user()
            self.member = user.__dict__

            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
            await self.accept()
        except ObjectDoesNotExist:
            pass

    # Leaves a group
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive a message from a websocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_body = text_data_json["message_body"]
        user_id = self.scope["user"].id
        previous_message_id = text_data_json["previous_message_id"]
        creator = {
            "id": self.member["id"],
            "first_name": self.member["first_name"],
            "last_name": self.member["last_name"],
            "preferred_name": self.member["preferred_name"],
        }
        previous_message = None
        if previous_message_id is not None:
            get_previous_message = database_sync_to_async(
                lambda: Message.objects.get(id=previous_message_id)
            )
            previous_message_result = await get_previous_message()
            previous_message = {
                "id": previous_message_id,
                "message_body": previous_message_result.content,
                "creator_id": previous_message_result.creator_id,
                "datetime_created": previous_message_result.datetime_created.strftime(
                    "%Y-%m-%dT%H:%M:%S.%fZ")
            }

        if self.member["id"] == user_id:
            create_message = database_sync_to_async(
                lambda: Message.objects.create(
                    creator_id=user_id, content=message_body, room_id=self.room_id,
                    previous_message_id=previous_message_id,
                )
            )
            message_object = await create_message()
            save_message = database_sync_to_async(lambda: message_object.save())
            await save_message()

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "chat_message",
                    "id": message_object.id,
                    "message_body": message_body,
                    "creator": creator,
                    "previous_message": previous_message,
                    "datetime_created": message_object.datetime_created.strftime(
                        "%Y-%m-%dT%H:%M:%S.%fZ"
                    ),
                },
            )
        else:
            await self.channel_layer.group_discard(
                self.room_group_name, self.channel_name
            )

    # Sends a received message to the group
    async def chat_message(self, event):
        message_id = event["id"]
        message_body = event["message_body"]
        creator = event["creator"]
        datetime_created = event["datetime_created"]
        previous_message = event["previous_message"]
        user_id = self.scope["user"].id
        
        if self.member["id"] == user_id:
            await self.send(
                text_data=json.dumps(
                    {
                        "id": message_id,
                        "message_body": message_body,
                        "creator": creator,
                        "previous_message": previous_message,
                        "datetime_created": datetime_created,
                    }
                )
            )

        else:
            await self.channel_layer.group_discard(
                self.room_group_name, self.channel_name
            )
