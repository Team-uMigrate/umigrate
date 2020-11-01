# Generated by Django 3.0.6 on 2020-10-20 03:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("contenttypes", "0002_remove_content_type_name"),
    ]

    operations = [
        migrations.CreateModel(
            name="Photo",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("image", models.ImageField(blank=True, upload_to="images/photos")),
                ("object_id", models.PositiveIntegerField()),
                (
                    "content_type",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="contenttypes.ContentType",
                    ),
                ),
            ],
        ),
    ]
