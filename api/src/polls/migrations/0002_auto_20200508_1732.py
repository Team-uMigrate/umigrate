# Generated by Django 3.0.6 on 2020-05-08 21:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('polls', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='vote',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vote_set', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='vote',
            name='option',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vote_set', to='polls.Option'),
        ),
        migrations.AddField(
            model_name='pollcomment',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='polls_pollcomment_comment_set', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='pollcomment',
            name='liked_users',
            field=models.ManyToManyField(blank=True, related_name='liked_polls_pollcomment_comment_set', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='pollcomment',
            name='poll',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment_set', to='polls.Poll'),
        ),
        migrations.AddField(
            model_name='pollcomment',
            name='tagged_users',
            field=models.ManyToManyField(blank=True, related_name='tagged_polls_pollcomment_comment_set', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='poll',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='polls_poll_set', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='poll',
            name='liked_users',
            field=models.ManyToManyField(blank=True, related_name='liked_polls_poll_comment_set', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='poll',
            name='tagged_users',
            field=models.ManyToManyField(blank=True, related_name='tagged_polls_poll_comment_set', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='option',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='option_set', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='option',
            name='poll',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='option_set', to='polls.Poll'),
        ),
    ]