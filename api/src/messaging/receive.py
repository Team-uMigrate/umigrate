from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.core.exceptions import ObjectDoesNotExist
import json
from .models import Room, Message


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
        previous_message_result = await database_sync_to_async(
            lambda: Message.objects.get(id=previous_message_id)
        )()
        tagged_users_previous = await database_sync_to_async(
            lambda: previous_message_result.tagged_users.values_list("id", flat=True)
        )()
        previous_message = {
            "id": previous_message_id,
            "message_body": previous_message_result.content,
            "creator_id": previous_message_result.creator_id,
            "datetime_created": previous_message_result.datetime_created.strftime(
                "%Y-%m-%dT%H:%M:%S.%fZ"
            ),
            "tagged_users": list(tagged_users_previous),
        }

    message_object: Message = await database_sync_to_async(
        lambda: Message.objects.create(
            creator_id=self.scope["user"].id,
            content=message_body,
            room_id=self.room_id,
            previous_message_id=previous_message_id,
        )
    )()
    await database_sync_to_async(lambda: message_object.save())()
    await database_sync_to_async(
        lambda: message_object.tagged_users.add(*tagged_users)
    )()
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


async def receive_like(self, text_data_json: dict) -> dict:
    message_id: int = text_data_json["message_id"]
    is_liked: bool = text_data_json["like"]
    message: Message = await database_sync_to_async(
        lambda: Message.objects.get(id=message_id)
    )()
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
