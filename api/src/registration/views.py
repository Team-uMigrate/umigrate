from rest_auth.registration.views import RegisterView
from .serializers import RegistrationSerializer

class RegistrationView(RegisterView):
    serializer_class = RegistrationSerializer