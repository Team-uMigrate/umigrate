from django.db import models
from django.contrib.contenttypes.fields import GenericRelation
from django.db.models import QuerySet
from photos.models import Photo


class PhotoCollectionExtension(models.Model):
    """
    An abstract model class that adds a collection of photos to a Model class.
    """

    id: int = None
    """
    The id field of the model object. Must be overwritten.
    """

    photos = GenericRelation(Photo)

    class Meta:
        abstract = True

    def delete(self, using=None, keep_parents=False):
        # Delete all photos for this object from the file system
        photos: QuerySet[Photo] = self.photos.all()
        for photo in photos:
            photo.delete()

        super().delete()
