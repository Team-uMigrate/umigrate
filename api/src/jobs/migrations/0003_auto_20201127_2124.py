# Generated by Django 3.1.3 on 2020-11-28 02:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("jobs", "0002_job_creator"),
    ]

    operations = [
        migrations.AlterField(
            model_name="job",
            name="creator",
            field=models.ForeignKey(
                blank=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="job_set",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
