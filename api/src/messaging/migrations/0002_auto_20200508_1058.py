# Generated by Django 3.0.6 on 2020-05-08 14:58

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('messaging', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='members',
            field=models.ManyToManyField(blank=True, related_name='room_set', to=settings.AUTH_USER_MODEL),
        ),
    ]
