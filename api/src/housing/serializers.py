from common.generics.generic_serializers import GenericSerializer
from .models import Housing, HousingComment


# Serializes the housing model
class HousingSerializer(GenericSerializer):

    class Meta:
        model = Housing
        fields = '__all__'


# Serializes the housing comment model
class HousingCommentSerializer(GenericSerializer):

    class Meta:
        model = HousingComment
        fields = '__all__'
