# Generated by Django 3.1.1 on 2020-10-16 03:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0006_listingcomment_saved_posts'),
    ]

    operations = [
        migrations.RenameField(
            model_name='listing',
            old_name='saved_posts',
            new_name='saved_users',
        ),
        migrations.RenameField(
            model_name='listingcomment',
            old_name='saved_posts',
            new_name='saved_users',
        ),
    ]