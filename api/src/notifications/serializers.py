from .models import Notification
from common.generics.generic_serializers import GenericSerializer


# Serializes a notification
class NotificationSerializer(GenericSerializer):

    class Meta:
        model = Notification
        fields = '__all__'

