# Generated by Django 3.2.3 on 2021-05-16 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("messaging", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="membership",
            name="date_joined",
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]