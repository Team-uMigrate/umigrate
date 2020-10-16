from common.generics.generic_serializers import GenericSerializer
from .models import PhotoCollectionMember


# Serializes the PhotoCollectionMember model
class PhotoCollectionMemberSerializer(GenericSerializer):

    class Meta:
        model = PhotoCollectionMember
        fields = '__all__'
