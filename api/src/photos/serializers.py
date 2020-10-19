from common.generics.generic_serializers import GenericSerializer
from .models import Photo


# Serializes the Photo model
class PhotoSerializer(GenericSerializer):

    class Meta:
        model = Photo
        fields = '__all__'


# Serializes the Photo model with only the image field
class PhotoRetrieveSerializer(PhotoSerializer):

    class Meta:
        model = Photo
        fields = '__all__'
        exclude_fields = ['id', 'object_id', 'content_type']
