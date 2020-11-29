from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from .managers import CustomUserManager
from common.model_extensions import GenericPhotoModel
from common.constants.choices import Choices
from common.model_extensions import GenericPhotoModel
from datetime import date


# Represents a user object
class CustomUser(AbstractUser, GenericPhotoModel):
    username = None
    email = models.EmailField(_("email address"), unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    preferred_name = models.CharField(max_length=50)
    datetime_created = models.DateTimeField(auto_now_add=True)
    community = models.PositiveSmallIntegerField(
        choices=Choices.COMMUNITY_CHOICES, default=0
    )
    pronouns = models.PositiveSmallIntegerField(
        choices=Choices.PRONOUN_CHOICES, default=0
    )
    bio = models.CharField(max_length=1000, blank=True)
    birthday = models.DateField(default=date.today)
    current_term = models.PositiveSmallIntegerField(
        choices=Choices.TERM_CHOICES, default=0
    )
    enrolled_program = models.PositiveSmallIntegerField(
        choices=Choices.PROGRAM_CHOICES, default=0
    )
    phone_number = models.CharField(max_length=15, blank=True)
    profile_photo = models.ImageField(upload_to="images/photos", blank=True)
    background_photo = models.ImageField(upload_to="images/photos", blank=True)
    connected_users = models.ManyToManyField(
        to="self", related_name="connected_users", blank=True
    )
    blocked_users = models.ManyToManyField(
        to="self", related_name="blocked_users", blank=True
    )

    objects = CustomUserManager()

    def __str__(self):
        return self.preferred_name
