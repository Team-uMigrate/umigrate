# Generated by Django 3.1.3 on 2020-11-28 02:24

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("messaging", "0003_message_previous_message"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="message",
            name="background_photo",
        ),
        migrations.RemoveField(
            model_name="message",
            name="profile_photo",
        ),
        migrations.RemoveField(
            model_name="room",
            name="background_photo",
        ),
        migrations.RemoveField(
            model_name="room",
            name="creator",
        ),
        migrations.RemoveField(
            model_name="room",
            name="privacy_level",
        ),
        migrations.RemoveField(
            model_name="room",
            name="profile_photo",
        ),
        migrations.AlterField(
            model_name="message",
            name="liked_users",
            field=models.ManyToManyField(
                blank=True,
                related_name="liked_message_set",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="message",
            name="tagged_users",
            field=models.ManyToManyField(
                blank=True,
                related_name="tagged_message_set",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
