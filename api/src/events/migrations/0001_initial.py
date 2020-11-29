# Generated by Django 3.1.3 on 2020-11-29 01:31

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('content', models.CharField(blank=True, max_length=1000)),
                ('datetime_created', models.DateTimeField(auto_now_add=True)),
                ('community', models.PositiveSmallIntegerField(choices=[(0, 'Waterloo'), (1, 'Toronto'), (2, 'Brampton'), (3, 'Ottawa')])),
                ('start_datetime', models.DateTimeField(default=datetime.datetime.today)),
                ('end_datetime', models.DateTimeField(blank=True, null=True)),
                ('location', models.CharField(blank=True, max_length=100)),
                ('price', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=8)),
                ('price_scale', models.PositiveSmallIntegerField(blank=True, choices=[(0, 'Free'), (1, '$'), (2, '$$'), (3, '$$$'), (4, '$$$$'), (5, '$$$$$')], default=0)),
            ],
            options={
                'ordering': ['-datetime_created'],
                'abstract': False,
            },
        ),
    ]
