from channels.db import database_sync_to_async
from django.db import models
from django.contrib.contenttypes.models import ContentType
from .models import Message, Room
from notifications.utils import (
    create_liked_shared_item_notification,
    create_message_notification,
)
from users.models import CustomUser


async def receive_message(text_data_json: dict) -> dict:
    """
    A function for creating a message event.
    """

    message_body: str = text_data_json["message_body"]
    previous_message_id: int = text_data_json["previous_message_id"]
    tagged_users: list[int] = text_data_json["tagged_users"]
    content_type: int = text_data_json["content_type"]
    content_object: ContentType = None
    object_id: int = text_data_json["object_id"]
    user: CustomUser = text_data_json["user"]
    room: Room = text_data_json["room"]

    creator = {
        "id": text_data_json["member_id"],
        "first_name": text_data_json["first_name"],
        "last_name": text_data_json["last_name"],
        "preferred_name": text_data_json["preferred_name"],
    }

    if content_type and object_id:
        model_class: type(models.Model) = await database_sync_to_async(
            lambda: ContentType.objects.get(model=content_type).model_class()
        )()
        content_object: models.Model = await database_sync_to_async(
            lambda: model_class.objects.get(id=object_id)
        )()

    previous_message = None
    if previous_message_id is not None:
        previous_message_result: Message = await database_sync_to_async(
            lambda: Message.objects.get(id=previous_message_id)
        )()
        tagged_users_previous: list[int] = await database_sync_to_async(
            lambda: list(
                previous_message_result.tagged_users.values_list("id", flat=True)
            )
        )()
        previous_message = {
            "id": previous_message_id,
            "message_body": previous_message_result.content,
            "creator_id": previous_message_result.creator_id,
            "datetime_created": previous_message_result.datetime_created.strftime(
                "%Y-%m-%dT%H:%M:%S.%fZ"
            ),
            "tagged_users": tagged_users_previous,
            "content_type": str(previous_message_result.content_type),
            "object_id": previous_message_result.object_id,
        }

    message_object: Message = await database_sync_to_async(
        lambda: Message.objects.create(
            creator_id=text_data_json["creator_id"],
            content=message_body,
            room_id=text_data_json["room_id"],
            previous_message_id=previous_message_id,
            content_object=content_object,
        )
    )()
    await database_sync_to_async(lambda: message_object.save())()
    await database_sync_to_async(
        lambda: message_object.tagged_users.add(*tagged_users)
    )()
    await database_sync_to_async(
        lambda: create_message_notification(room.members.all(), user, message_object)
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
        "content_type": content_type,
        "object_id": object_id,
    }


async def receive_like(text_data_json: dict) -> dict:
    """
    A function for creating a like event.
    """

    message_id: int = text_data_json["message_id"]
    is_liked: bool = text_data_json["like"]
    user_id: int = text_data_json["user_id"]
    user: CustomUser = text_data_json["user"]

    message: Message = await database_sync_to_async(
        lambda: Message.objects.get(id=message_id)
    )()

    if is_liked:
        await database_sync_to_async(lambda: message.liked_users.add(user_id))()
        await database_sync_to_async(
            lambda: create_liked_shared_item_notification(message, user)
        )()
    else:
        await database_sync_to_async(lambda: message.liked_users.remove(user_id))()

    return {
        "type": "send_like",
        "message_id": message_id,
        "like": is_liked,
        "user_id": user_id,
    }
