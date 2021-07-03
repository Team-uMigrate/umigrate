# Generated by Django 3.2 on 2021-07-03 22:14

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customuser",
            name="blocked_users",
            field=models.ManyToManyField(
                blank=True,
                related_name="blocked_users_set",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="customuser",
            name="connected_users",
            field=models.ManyToManyField(
                blank=True,
                related_name="connected_users_set",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
