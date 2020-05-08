# Generated by Django 3.0.6 on 2020-05-08 14:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('datetime_created', models.DateTimeField(auto_now_add=True)),
                ('photo', models.ImageField(blank=True, upload_to='images/room_photos')),
                ('privacy_level', models.IntegerField(choices=[(0, 'Public'), (1, 'Private'), (2, 'Direct Messaging')], default=1)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='messaging_room_set', to=settings.AUTH_USER_MODEL)),
                ('members', models.ManyToManyField(related_name='room_set', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-datetime_created'],
            },
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('message_body', models.CharField(max_length=500)),
                ('datetime_created', models.DateTimeField(auto_now_add=True)),
                ('photo', models.ImageField(blank=True, upload_to='images/message_photos')),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='message_created_set', to=settings.AUTH_USER_MODEL)),
                ('liked_users', models.ManyToManyField(blank=True, related_name='liked_messaging_message_comment_set', to=settings.AUTH_USER_MODEL)),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='message_set', to='messaging.Room')),
                ('tagged_users', models.ManyToManyField(blank=True, related_name='tagged_messaging_message_comment_set', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-datetime_created'],
            },
        ),
    ]
