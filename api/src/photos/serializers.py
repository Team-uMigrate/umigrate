from common.generics.generic_serializers import GenericSerializer
from .models import PhotoCollectionMember


# Serializes the PhotoCollectionMember model
class PhotoCollectionMemberSerializer(GenericSerializer):

    class Meta:
        model = PhotoCollectionMember
        fields = '__all__'

# Serializes the PhotCollectionmember model with only the image field
class PhotoRetrieveSerializer(PhotoCollectionMemberSerializer):

    class Meta:
        model = PhotoCollectionMember
        fields = '__all__'
        exclude_fields = ['id', 'object_id', 'content_type']
        
