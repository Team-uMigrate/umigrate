# Generated by Django 3.1.1 on 2020-10-09 01:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('messaging', '0004_auto_20201008_2134'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='profile_photo',
            field=models.ImageField(blank=True, upload_to='images/room_profile_photos'),
        ),
        migrations.AlterField(
            model_name='room',
            name='background_photo',
            field=models.ImageField(blank=True, upload_to='images/room_background_photos'),
        ),
    ]
