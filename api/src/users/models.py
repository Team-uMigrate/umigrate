from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from common.constants.choices import Choices
from datetime import date
from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    """
    A custom manager for creating users and super users.
    """

    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError(_("The Email must be set"))

        email = self.normalize_email(email)

        if not (
            str(email).endswith("@uwaterloo.ca")
            or str(email) == "teamumigrate@gmail.com"
        ):
            raise ValueError(_("The Email must end with uwaterloo.ca"))

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if not extra_fields.get("is_staff"):
            raise ValueError(_("Superuser must have is_staff=True."))
        if not extra_fields.get("is_superuser"):
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    """
    A model class that represents a user.
    """

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

    def delete(self, using=None, keep_parents=False):
        self.profile_photo.delete()
        self.background_photo.delete()
        super().delete()

    def save(self, *args, **kwargs):
        if self.id is not None:
            db_instance: CustomUser = self.__class__.objects.get(id=self.id)

            if self.profile_photo != db_instance.profile_photo:
                db_instance.profile_photo.delete(save=False)

            if self.background_photo != db_instance.background_photo:
                db_instance.background_photo.delete(save=False)

        super().save(*args, **kwargs)
