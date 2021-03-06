# Generated by Django 3.1.3 on 2020-11-29 01:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("contenttypes", "0002_remove_content_type_name"),
    ]

    operations = [
        migrations.CreateModel(
            name="Device",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=50)),
                ("expo_push_token", models.CharField(max_length=50)),
                ("datetime_created", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "ordering": ["-datetime_created"],
            },
        ),
        migrations.CreateModel(
            name="Notification",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("content", models.CharField(max_length=100)),
                ("object_id", models.PositiveIntegerField()),
                ("datetime_created", models.DateTimeField(auto_now_add=True)),
                (
                    "content_type",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="contenttypes.contenttype",
                    ),
                ),
            ],
            options={
                "ordering": ["-datetime_created"],
            },
        ),
    ]
