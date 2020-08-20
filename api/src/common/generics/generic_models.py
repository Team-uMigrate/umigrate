from django.db import models
from common.constants.choices import Choices


# Custom manager for multiple deletions at once
class CustomManager(models.Manager):
    def delete(self):
        for obj in self.get_queryset():
            obj.delete()


# Abstract model that contains basic member variables
class GenericModel(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500, blank=True)
    region = models.PositiveSmallIntegerField(choices=Choices.REGION_CHOICES)
    datetime_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-datetime_created']
        abstract = True

    def __str__(self):
        return f'{self.title}'


# An abstract model that represents a generic object with a photo member
class GenericPhotoModel(models.Model):
    # id field should be overridden
    id = None
    # Photo field should be overridden
    photo = None
    objects = CustomManager()
    old_photo_instance = None

    class Meta:
        abstract = True

    def delete(self, using=None, keep_parents=False):
        self.photo.delete()
        super().delete()

    def save(self, *args, **kwargs):
        try:
            db_instance = self.__class__.objects.get(id=self.id)
            if self.photo != db_instance.photo:
                db_instance.photo.delete(save=False)
        # Todo: Identify types of exceptions thrown
        except Exception:
            pass

        super().save(*args, **kwargs)
