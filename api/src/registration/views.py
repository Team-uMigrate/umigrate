from django.conf import settings
from rest_auth.registration.views import RegisterView
from rest_auth.utils import jwt_encode
from rest_auth.app_settings import create_token
from allauth.account.utils import complete_signup
from allauth.account import app_settings as allauth_settings
from .serializers import RegistrationSerializer
from uwaterloodriver import UW_Driver


class RegistrationView(RegisterView):
    serializer_class = RegistrationSerializer
    queryset = ''
    uw = UW_Driver()

    # Overrides from rest_auth to insert load_uwaterloo_data after initial user creation but before email is sent
    def perform_create(self, serializer):
        user = serializer.save(self.request)
        self.load_uwaterloo_data(user, serializer)
        if getattr(settings, 'REST_USE_JWT', False):
            self.token = jwt_encode(user)
        else:
            create_token(self.token_model, user, serializer)

        complete_signup(self.request._request, user,
                        allauth_settings.EMAIL_VERIFICATION,
                        None)
        return user

    """
    UWaterloo API Response Example:
    {'full_name': 'John Smith', 'given_name': 'John', 'last_name': 'Smith', 'user_id': 'j21smith', 
    'department': 'ENG/Electrical and Computer', 'common_names': ['John Smith'], 
    'email_addresses': ['j21smith@uwaterloo.ca'], 'offices': [], 'telephone_numbers': [], 'homepage': ''}
    """

    # Grabs user's data from UWaterloo API and loads it into user database
    def load_uwaterloo_data(self, user, serializer):
        uwResponse = self.uw.directory_people_search(user.email.split("@")[0])
        serializer.validate_uwResponse(uwResponse)
        user.first_name = uwResponse['given_name']
        user.last_name = uwResponse['last_name']
        user.preferred_name = uwResponse['given_name']
        # Maps users department to program and defaults to 0 (Unknown) if not found
        user.enrolled_program = {
                        'ENG': 1,
                        'ART': 2,
                        'MAT': 3,
                        'SCI': 4,
                        'AHS': 5,
                        'ENV': 6,
                        'THL': 7,
                        'GRAD': 8,
                        'IS': 9,
                        'VPA': 10,
                        'CGC': 11,
                        'REN': 12,
                        'STP': 13,
                        'STJ': 14
                        }.get(uwResponse['department'].split("/")[0], 0)
        if uwResponse['telephone_numbers']:
            user.phone_number = uwResponse['telephone_numbers'][0]
        print(uwResponse)
        user.save()
