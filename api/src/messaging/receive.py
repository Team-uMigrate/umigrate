from channels.db import database_sync_to_async
from django.contrib.contenttypes.models import ContentType
from .models import Message


async def receive_message(consumer, text_data_json: dict) -> dict:
    message_body = text_data_json["message_body"]
    previous_message_id = text_data_json["previous_message_id"]
    tagged_users = text_data_json["tagged_users"]
    content_type = text_data_json["content_type"]
    content_object = None
    object_id = text_data_json["object_id"]

    creator = {
        "id": consumer.member["id"],
        "first_name": consumer.member["first_name"],
        "last_name": consumer.member["last_name"],
        "preferred_name": consumer.member["preferred_name"],
    }

    if content_type and object_id > 0:
        content_type = await database_sync_to_async(ContentType.objects.get)(
            model=content_type
        )
        content_type = content_type.model_class()
        content_object = await database_sync_to_async(content_type.objects.get)(
            id=object_id
        )

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
            "content_type": str(previous_message_result.content_type),
            "object_id": previous_message_result.object_id,
        }

    message_object: Message = await database_sync_to_async(
        lambda: Message.objects.create(
            creator_id=consumer.scope["user"].id,
            content=message_body,
            room_id=consumer.room_id,
            previous_message_id=previous_message_id,
            content_object=content_object,
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
        "content_type": text_data_json["content_type"],
        "object_id": text_data_json["object_id"],
    }


async def receive_like(consumer, text_data_json: dict) -> dict:
    message_id: int = text_data_json["message_id"]
    is_liked: bool = text_data_json["like"]
    message: Message = await database_sync_to_async(
        lambda: Message.objects.get(id=message_id)
    )()
    if is_liked:
        await database_sync_to_async(
            lambda: message.liked_users.add(consumer.scope["user"].id)
        )()
    else:
        await database_sync_to_async(
            lambda: message.liked_users.remove(consumer.scope["user"].id)
        )()
    return {
        "type": "send_like",
        "message_id": message_id,
        "like": is_liked,
        "user_id": consumer.scope["user"].id,
    }
