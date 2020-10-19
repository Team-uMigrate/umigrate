from django.db import models
from django.contrib.contenttypes.fields import GenericRelation
from photos.models import Photo


# Custom manager for multiple deletions at once
class CustomManager(models.Manager):
    def delete(self):
        for obj in self.get_queryset():
            obj.delete()


# An abstract model that represents a generic object with a photo member
class GenericPhotoModel(models.Model):
    # id field should be overridden
    id = None
    # Background and Profile photo fields should be overridden
    profile_photo = None
    background_photo = None
    objects = CustomManager()
    old_photo_instance = None

    class Meta:
        abstract = True

    def delete(self, using=None, keep_parents=False):
        self.profile_photo.delete()
        self.background_photo.delete()
        super().delete()

    def save(self, *args, **kwargs):
        try:
            db_instance = self.__class__.objects.get(id=self.id)
            if self.profile_photo != db_instance.profile_photo:
                db_instance.profile_photo.delete(save=False)
            if self.background_photo != db_instance.background_photo:
                db_instance.background_photo.delete(save=False)
        # Todo: Identify types of exceptions thrown
        except Exception:
            pass

        super().save(*args, **kwargs)


# An abstract model that represents a generic object with a photo member
class GenericPhotoCollection(models.Model):
    # id field should be overridden
    id = None
    photos = GenericRelation(Photo)

    class Meta:
        abstract = True
