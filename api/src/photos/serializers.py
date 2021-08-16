from common.serializer_extensions import ModelSerializerExtension
from .models import Photo


class PhotoSerializer(ModelSerializerExtension):
    """
    A serializer class for the Photo model.
    """

    class Meta:
        model = Photo
        fields = "__all__"


class PhotoRetrieveSerializer(PhotoSerializer):
    """
    A serializer class for the Photo model with only the image field.
    """

    class Meta:
        model = Photo
        fields = "__all__"
        exclude_fields = ["id", "object_id", "content_type"]
