from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class CustomManager(models.Manager):
    """
    A custom manager for multiple deletions at once.
    """

    def delete(self):
        for obj in self.get_queryset():
            obj.delete()


class Photo(models.Model):
    """
    A model class that represents a photo.
    """

    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to="images/photos", blank=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")

    objects = CustomManager()

    def delete(self, using=None, keep_parents=False):
        self.image.delete()
        super().delete()

    def save(self, *args, **kwargs):
        if self.id is not None:
            db_instance: Photo = self.__class__.objects.get(id=self.id)

            if self.image != db_instance.image:
                db_instance.image.delete(save=False)

        super().save(*args, **kwargs)
