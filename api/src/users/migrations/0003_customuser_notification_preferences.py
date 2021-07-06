# Generated by Django 3.2 on 2021-07-05 16:02

from django.db import migrations
import multiselectfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0002_auto_20210703_1814"),
    ]

    operations = [
        migrations.AddField(
            model_name="customuser",
            name="notification_preferences",
            field=multiselectfield.db.fields.MultiSelectField(
                blank=True,
                choices=[
                    (1, "Shared_Item_Likes"),
                    (2, "Messages_Received"),
                    (3, "Shared_Item_Comments"),
                    (4, "Shared_Item_Tag"),
                    (5, "Connection_Request"),
                ],
                default="1,2,3,4,5",
                max_length=9,
                null=True,
            ),
        ),
    ]
