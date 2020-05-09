# Generated by Django 3.0.6 on 2020-05-08 21:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('housing', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='housingcomment',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='housing_housingcomment_comment_set', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='housingcomment',
            name='housing',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment_set', to='housing.Housing'),
        ),
        migrations.AddField(
            model_name='housingcomment',
            name='liked_users',
            field=models.ManyToManyField(blank=True, related_name='liked_housing_housingcomment_comment_set', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='housingcomment',
            name='tagged_users',
            field=models.ManyToManyField(blank=True, related_name='tagged_housing_housingcomment_comment_set', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='housing',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='housing_housing_set', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='housing',
            name='liked_users',
            field=models.ManyToManyField(blank=True, related_name='liked_housing_housing_comment_set', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='housing',
            name='tagged_users',
            field=models.ManyToManyField(blank=True, related_name='tagged_housing_housing_comment_set', to=settings.AUTH_USER_MODEL),
        ),
    ]