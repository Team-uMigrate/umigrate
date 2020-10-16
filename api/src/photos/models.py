from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


# An image model that serves as a child/member of the GenericPhotoCollectionModel. 
# It's sole purpose is for GenericPhotoCollectionModel to support multiple imagefields
class PhotoCollectionMember(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='images/collections', blank=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id') 
    
    """
    objects = CustomManager()
   
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
    """

    def __str__(self):
        return f'{self.content}'
