from common.abstract_serializers import GenericSerializer
from .models import Job


# Serializes the job model
class JobSerializer(GenericSerializer):

    class Meta:
        model = Job
        fields = '__all__'
