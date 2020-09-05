from rest_framework.authentication import SessionAuthentication


# Custom session authentication class that ignores csrf checks
class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return
