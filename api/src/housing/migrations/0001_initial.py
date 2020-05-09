# Generated by Django 3.0.6 on 2020-05-08 21:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Housing',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('description', models.CharField(blank=True, max_length=500)),
                ('region', models.PositiveSmallIntegerField(choices=[(0, 'Waterloo'), (1, 'Toronto'), (2, 'Brampton'), (3, 'Ottawa')])),
                ('datetime_created', models.DateTimeField(auto_now_add=True)),
                ('photo', models.ImageField(blank=True, upload_to='images/housing_photos')),
                ('category', models.PositiveSmallIntegerField(choices=[(0, 'Electronics'), (1, 'Books'), (2, 'Food'), (3, 'Other')])),
                ('features', models.CharField(blank=True, max_length=500)),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=9)),
                ('street_address', models.CharField(blank=True, max_length=30)),
                ('city', models.CharField(blank=True, max_length=30)),
                ('division', models.CharField(blank=True, max_length=30)),
                ('country', models.CharField(blank=True, max_length=30)),
                ('term', models.PositiveSmallIntegerField(choices=[(0, '1A'), (1, '1B'), (2, 'W1'), (3, '2A'), (4, 'W2'), (5, '2B'), (6, 'W3'), (7, '3A'), (8, 'W4'), (9, '3B'), (10, 'W5'), (11, 'W6'), (12, '4A'), (13, '4B')])),
            ],
            options={
                'ordering': ['-datetime_created'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='HousingComment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('comment_body', models.TextField(max_length=1000)),
                ('datetime_created', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-datetime_created'],
                'abstract': False,
            },
        ),
    ]