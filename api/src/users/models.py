from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from .managers import CustomUserManager
from common.generics.generic_models import GenericPhotoModel
from common.constants.choices import Choices
from common.generics.generic_models import GenericPhotoModel
from datetime import date


# Represents a user object
class CustomUser(AbstractUser, GenericPhotoModel):
    username = None
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    preferred_name = models.CharField(max_length=30)
    pronouns = models.PositiveSmallIntegerField(choices=Choices.PRONOUN_CHOICES, default=0, blank=True)
    bio = models.CharField(max_length=1000, blank=True)
    birthday = models.DateField(default=date.today)
    current_term = models.PositiveSmallIntegerField(choices=Choices.TERM_CHOICES, default=0)
    enrolled_program = models.PositiveSmallIntegerField(choices=Choices.PROGRAM_CHOICES, default=0)
    phone_number = models.CharField(max_length=15, default='11234567890', blank=True)
    profile_photo = models.ImageField(upload_to='images/user_profile_photos', blank=True)
    background_photo = models.ImageField(upload_to='images/user_background_photos', blank=True)
    region = models.PositiveSmallIntegerField(choices=Choices.REGION_CHOICES, default=0)
    datetime_created = models.DateTimeField(auto_now_add=True)

    # User settings field
    notification_privacy = models.PositiveSmallIntegerField(choices=Choices.NOTIFICATION_PRIVACY_CHOICES, default=0)
    allow_location = models.BooleanField(default=False)
    currency = models.PositiveSmallIntegerField(choices=Choices.CURRENCY_CHOICES, default=0)
    language = models.PositiveSmallIntegerField(choices=Choices.LANGUAGE_CHOICES, default=0)
    dark_theme = models.BooleanField(default=False)
    connected_users = models.ManyToManyField(to='self', related_name="connected_user_set", blank=True)
    blocked_users = models.ManyToManyField(to='self', related_name="blocked_user_set", blank=True)

    objects = CustomUserManager()

    def __str__(self):
        return self.preferred_name
