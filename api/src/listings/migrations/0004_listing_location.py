# Generated by Django 3.0.8 on 2020-09-21 00:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0003_auto_20200920_0055'),
    ]

    operations = [
        migrations.AddField(
            model_name='listing',
            name='location',
            field=models.CharField(default='L3R8K5', max_length=100),
            preserve_default=False,
        ),
    ]