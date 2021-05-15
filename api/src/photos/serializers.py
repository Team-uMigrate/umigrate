from common.serializer_extensions import ModelSerializerExtension
from .models import Photo


# A serializer class for the Photo model
class PhotoSerializer(ModelSerializerExtension):
    class Meta:
        model = Photo
        fields = "__all__"


# A serializer class for the Photo model with only the image field
class PhotoRetrieveSerializer(PhotoSerializer):
    class Meta:
        model = Photo
        fields = "__all__"
        exclude_fields = ["id", "object_id", "content_type"]
