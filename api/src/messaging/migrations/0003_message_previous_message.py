# Generated by Django 3.1.1 on 2020-10-29 00:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("messaging", "0002_auto_20201019_2305"),
    ]

    operations = [
        migrations.AddField(
            model_name="message",
            name="previous_message",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.DO_NOTHING,
                related_name="replies",
                to="messaging.message",
            ),
        ),
    ]
