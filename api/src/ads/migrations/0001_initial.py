# Generated by Django 3.0.6 on 2020-05-06 22:34

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
            name='Ad',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('description', models.CharField(blank=True, max_length=500)),
                ('region', models.PositiveSmallIntegerField(choices=[(0, 'Waterloo'), (1, 'Toronto'), (2, 'Brampton'), (3, 'Ottawa')])),
                ('datetime_created', models.DateTimeField(auto_now_add=True)),
                ('photo', models.ImageField(blank=True, upload_to='images/ad_photos')),
                ('category', models.PositiveSmallIntegerField(choices=[(0, 'Electronics'), (1, 'Books'), (2, 'Food'), (3, 'Other')])),
                ('features', models.CharField(blank=True, max_length=500)),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=9)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ads_ad_set', to=settings.AUTH_USER_MODEL)),
                ('liked_users', models.ManyToManyField(blank=True, related_name='liked_ads_ad_comment_set', to=settings.AUTH_USER_MODEL)),
                ('tagged_users', models.ManyToManyField(blank=True, related_name='tagged_ads_ad_comment_set', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-datetime_created'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='AdComment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('comment_body', models.TextField(max_length=1000)),
                ('datetime_created', models.DateTimeField(auto_now_add=True)),
                ('ad', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment_set', to='ads.Ad')),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ads_adcomment_comment_set', to=settings.AUTH_USER_MODEL)),
                ('liked_users', models.ManyToManyField(blank=True, related_name='liked_ads_adcomment_comment_set', to=settings.AUTH_USER_MODEL)),
                ('tagged_users', models.ManyToManyField(blank=True, related_name='tagged_ads_adcomment_comment_set', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-datetime_created'],
                'abstract': False,
            },
        ),
    ]
