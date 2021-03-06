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
        user_id = self.scope["user"].id
        if self.member["id"] == user_id:
            event = None
            if text_data_json["type"] == "send_message":
                event = await self.receive_message(text_data_json)
            elif text_data_json["type"] == "send_like":
                event = await self.receive_like(text_data_json)
            if event is not None:
                await self.channel_layer.group_send(self.room_group_name, event)
        else:
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name,
            )

    async def receive_like(self, text_data_json: dict) -> dict:
        message_id = text_data_json["message_id"]
        is_liked = text_data_json["like"]
        get_message = database_sync_to_async(lambda: Message.objects.get(id=message_id))
        message: Message = await get_message()
        if is_liked:
            await database_sync_to_async(
                lambda: message.liked_users.add(self.scope["user"].id)
            )()
        else:
            await database_sync_to_async(
                lambda: message.liked_users.remove(self.scope["user"].id)
            )()
        return {
            "type": "send_like",
            "message_id": message_id,
            "like": is_liked,
            "user_id": self.scope["user"].id,
        }

    async def receive_message(self, text_data_json: dict) -> dict:
        message_body = text_data_json["message_body"]
        previous_message_id = text_data_json["previous_message_id"]
        tagged_users = text_data_json["tagged_users"]
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
            get_previous_message_tagged_users = database_sync_to_async(
                lambda: previous_message_result.tagged_users.values_list(
                    "id", flat=True
                )
            )
            tagged_users_previous = await get_previous_message_tagged_users()
            previous_message = {
                "id": previous_message_id,
                "message_body": previous_message_result.content,
                "creator_id": previous_message_result.creator_id,
                "datetime_created": previous_message_result.datetime_created.strftime(
                    "%Y-%m-%dT%H:%M:%S.%fZ"
                ),
                "tagged_users": list(tagged_users_previous),
            }

        create_message = database_sync_to_async(
            lambda: Message.objects.create(
                creator_id=self.scope["user"].id,
                content=message_body,
                room_id=self.room_id,
                previous_message_id=previous_message_id,
            )
        )

        message_object: Message = await create_message()
        save_message = database_sync_to_async(lambda: message_object.save())
        await save_message()
        add_tagged_users = database_sync_to_async(
            lambda: message_object.tagged_users.add(*tagged_users)
        )
        await add_tagged_users()
        return {
            "type": "send_message",
            "id": message_object.id,
            "message_body": message_body,
            "creator": creator,
            "previous_message": previous_message,
            "datetime_created": message_object.datetime_created.strftime(
                "%Y-%m-%dT%H:%M:%S.%fZ"
            ),
            "tagged_users": tagged_users,
        }

    # Sends a received message to the group
    async def send_like(self, event):
        message_id = event["message_id"]
        is_liked = event["like"]
        liked_user_id = event["user_id"]
        user_id = self.scope["user"].id

        if self.member["id"] == user_id:
            await self.send(
                text_data=json.dumps(
                    {
                        "message_id": message_id,
                        "like": is_liked,
                        "user_id": liked_user_id,
                    }
                )
            )

        else:
            await self.channel_layer.group_discard(
                self.room_group_name, self.channel_name
            )

    async def send_message(self, event):
        message_id = event["id"]
        message_body = event["message_body"]
        creator = event["creator"]
        datetime_created = event["datetime_created"]
        previous_message = event["previous_message"]
        tagged_users = event["tagged_users"]
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
                        "tagged_users": tagged_users,
                    }
                )
            )

        else:
            await self.channel_layer.group_discard(
                self.room_group_name, self.channel_name
            )
