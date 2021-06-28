from .models import Event
from datetime import datetime
from channels.db import database_sync_to_async
from common.notification_helpers import event_reminder_notfication

async def event_reminder_generator(event_id : int):
    '''
    Expected: We receieve information about what even this reminder is for
    Note: eveything is in UTC time
    1) using the scheduled time of the event, find what type of event it is (ie: what type of notification we are sending out, notification at 15 min interval, 30...)
    2) find which users are attending this type of an event
    3) to all the users attending the event, create a notification (tbd) and send it out
    '''
    event = Event.objects.filter(id=event_id)
    if event.count() > 0:
        notification_time = event.startdatetime - datetime.utcnow()
        print(notification_time)
        notifying_users = event.attending_users.preferences.filter(notification_time)
        await database_sync_to_async(
            lambda: event_reminder_notfication(
                notifying_users, event
            )
        )()
    else:
        raise ValueError(f"The event with id {event_id} does not exist; the event must have been cancelled or deleted")