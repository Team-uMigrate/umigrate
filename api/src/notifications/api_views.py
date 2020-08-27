from django.http import QueryDict
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Notification
from .serializers import NotificationSerializer

class NotificationListCreate(ListCreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    filter_fields = ['title', 'datetime_created', 'region']
    search_fields = ['title', 'region']
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]

    def list(self, request, *args, **kwargs):
        return ListCreateAPIView.list(self, request, *args, **kwargs)


class NotificationRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Notification.objects.all()
    lookup_field = 'id'
    serializer_class = NotificationSerializer

    def retrieve(self, request, *args, **kwargs):
        return RetrieveUpdateDestroyAPIView.retrieve(self, request, *args, **kwargs)

    # When updating a notification object, the members in request are to be removed from the notification
    ## cant add users to the notification after creation
    def update(self, request, *args, **kwargs):
        if isinstance(request.data, QueryDict):
            request.data._mutable = True

        notification = self.queryset.model.objects.get(id=kwargs['id'])
        for member in request.data['members']:
            user = notification.members.get(id=member['id'])
            notification.members.remove(user)

        request.data['members'] = [member.id for member in notification.members.all()]

        if not request.data['members']:
            return RetrieveUpdateDestroyAPIView.destroy(self, request, *args, **kwargs)

        return RetrieveUpdateDestroyAPIView.update(self, request, *args, **kwargs)
