# Generated by Django 3.1.1 on 2020-10-16 03:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0006_postcomment_saved_posts'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='saved_posts',
            new_name='saved_users',
        ),
        migrations.RenameField(
            model_name='postcomment',
            old_name='saved_posts',
            new_name='saved_users',
        ),
    ]