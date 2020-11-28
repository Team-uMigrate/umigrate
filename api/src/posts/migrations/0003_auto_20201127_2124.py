# Generated by Django 3.1.3 on 2020-11-28 02:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("posts", "0002_auto_20201019_2305"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="creator",
            field=models.ForeignKey(
                blank=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="post_set",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="post",
            name="liked_users",
            field=models.ManyToManyField(
                blank=True, related_name="liked_post_set", to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.AlterField(
            model_name="post",
            name="saved_users",
            field=models.ManyToManyField(
                blank=True, related_name="saved_post_set", to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.AlterField(
            model_name="post",
            name="tagged_users",
            field=models.ManyToManyField(
                blank=True, related_name="tagged_post_set", to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
