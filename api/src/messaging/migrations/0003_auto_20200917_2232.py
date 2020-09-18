# Generated by Django 3.1.1 on 2020-09-18 02:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('messaging', '0002_auto_20200508_1732'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='message_body',
            new_name='content',
        ),
        migrations.AlterField(
            model_name='message',
            name='creator',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='message_created_set', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='room',
            name='creator',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='messaging_room_set', to=settings.AUTH_USER_MODEL),
        ),
    ]