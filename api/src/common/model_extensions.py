from django.db import models
from django.contrib.contenttypes.fields import GenericRelation
from photos.models import Photo


# An abstract model class that adds a collection of photos to a model class
class PhotoCollectionExtension(models.Model):
    id: int = None  # Must be overridden
    photos = GenericRelation(Photo)

    class Meta:
        abstract = True

    def delete(self, using=None, keep_parents=False):
        photos = self.photos.all()
        for photo in photos:
            photo.delete()

        super().delete()
