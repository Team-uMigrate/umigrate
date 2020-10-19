# Generated by Django 3.1.1 on 2020-10-19 14:34

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
            name='Post',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('content', models.CharField(blank=True, max_length=1000)),
                ('region', models.PositiveSmallIntegerField(choices=[(0, 'Waterloo'), (1, 'Toronto'), (2, 'Brampton'), (3, 'Ottawa')])),
                ('datetime_created', models.DateTimeField(auto_now_add=True)),
                ('creator', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='posts_post_set', to=settings.AUTH_USER_MODEL)),
                ('liked_users', models.ManyToManyField(blank=True, related_name='liked_posts_post_set', to=settings.AUTH_USER_MODEL)),
                ('saved_users', models.ManyToManyField(blank=True, related_name='saved_posts_post_set', to=settings.AUTH_USER_MODEL)),
                ('tagged_users', models.ManyToManyField(blank=True, related_name='tagged_posts_post_set', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-datetime_created'],
                'abstract': False,
            },
        ),
    ]