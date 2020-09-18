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
    pronouns = models.PositiveSmallIntegerField(default=0, choices=Choices.PRONOUN_CHOICES, blank=True)
    bio = models.CharField(max_length=1000, blank=True)
    birthday = models.DateField(default=date.today)
    current_term = models.PositiveSmallIntegerField(default=0, choices=Choices.TERM_CHOICES)
    enrolled_program = models.PositiveSmallIntegerField(default=0, choices=Choices.PROGRAM_CHOICES)
    phone_number = models.CharField(max_length=15, blank=True)
    photo = models.ImageField(upload_to='images/user_photos', blank=True)
    region = models.PositiveSmallIntegerField(default=0, choices=Choices.REGION_CHOICES)
    datetime_created = models.DateTimeField(auto_now_add=True)

    # User settings field
    notification_privacy = models.PositiveSmallIntegerField(default=0, choices=Choices.NOTIFICATION_PRIVACY_CHOICES)
    allow_location = models.BooleanField(default=False)
    currency = models.PositiveSmallIntegerField(default=0, choices=Choices.CURRENCY_CHOICES)
    language = models.PositiveSmallIntegerField(default=0, choices=Choices.LANGUAGE_CHOICES)
    dark_theme = models.BooleanField(default=False)
    connected_users = models.ManyToManyField(to='self', related_name="followed_user_set", blank=True)
    blocked_users = models.ManyToManyField(to='self', related_name="blocked_user_set", blank=True)

    objects = CustomUserManager()    

    def __str__(self):
        return self.preferred_name
