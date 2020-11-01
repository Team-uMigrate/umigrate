# Generated by Django 3.0.6 on 2020-10-20 03:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("events", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="event",
            name="attending_users",
            field=models.ManyToManyField(
                blank=True,
                related_name="attending_event_set",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="event",
            name="creator",
            field=models.ForeignKey(
                blank=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="events_event_set",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="event",
            name="interested_users",
            field=models.ManyToManyField(
                blank=True,
                related_name="interested_event_set",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="event",
            name="liked_users",
            field=models.ManyToManyField(
                blank=True,
                related_name="liked_events_event_set",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="event",
            name="saved_users",
            field=models.ManyToManyField(
                blank=True,
                related_name="saved_events_event_set",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="event",
            name="tagged_users",
            field=models.ManyToManyField(
                blank=True,
                related_name="tagged_events_event_set",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
