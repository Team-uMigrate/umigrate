# Generated by Django 3.1.3 on 2020-11-29 01:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Ad",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("title", models.CharField(max_length=100)),
                ("content", models.CharField(blank=True, max_length=1000)),
                ("datetime_created", models.DateTimeField(auto_now_add=True)),
                (
                    "community",
                    models.PositiveSmallIntegerField(
                        choices=[
                            (0, "Waterloo"),
                            (1, "Toronto"),
                            (2, "Brampton"),
                            (3, "Ottawa"),
                        ]
                    ),
                ),
                ("is_service", models.BooleanField(default=False)),
                ("is_buying", models.BooleanField(default=False)),
                (
                    "category",
                    models.PositiveSmallIntegerField(
                        choices=[
                            (0, "Electronics"),
                            (1, "Books"),
                            (2, "Food"),
                            (3, "Other"),
                        ],
                        default=0,
                    ),
                ),
                ("postal_code", models.CharField(blank=True, max_length=6)),
                (
                    "price",
                    models.DecimalField(decimal_places=2, default=0.0, max_digits=8),
                ),
                ("quantity", models.PositiveSmallIntegerField(default=0)),
            ],
            options={
                "ordering": ["-datetime_created"],
                "abstract": False,
            },
        ),
    ]
