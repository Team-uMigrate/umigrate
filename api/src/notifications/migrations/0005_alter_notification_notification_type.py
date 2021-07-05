# Generated by Django 3.2.4 on 2021-07-05 03:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0004_alter_notification_notification_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='notification_type',
            field=models.PositiveSmallIntegerField(choices=[(1, 'Shared_Item_Likes'), (2, 'Messages_Received'), (3, 'Shared_Item_Comments'), (4, 'Shared_Item_Tag'), (5, 'Connection_Request')], default=1),
        ),
    ]
