from common.abstract_serializers import ModelSerializerExtension
from .models import Job


# Serializes the job model
class JobSerializer(ModelSerializerExtension):

    class Meta:
        model = Job
        fields = '__all__'
