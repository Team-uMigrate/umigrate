# Generated by Django 3.1.3 on 2020-11-29 01:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("ads", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="ad",
            name="confirmed_users",
            field=models.ManyToManyField(
                blank=True, related_name="confirmed_ads", to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.AddField(
            model_name="ad",
            name="contacted_users",
            field=models.ManyToManyField(
                blank=True, related_name="contacted_ads", to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.AddField(
            model_name="ad",
            name="creator",
            field=models.ForeignKey(
                blank=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="created_ads",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="ad",
            name="liked_users",
            field=models.ManyToManyField(
                blank=True, related_name="liked_ads", to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.AddField(
            model_name="ad",
            name="saved_users",
            field=models.ManyToManyField(
                blank=True, related_name="saved_ads", to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.AddField(
            model_name="ad",
            name="tagged_users",
            field=models.ManyToManyField(
                blank=True, related_name="tagged_ads", to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
