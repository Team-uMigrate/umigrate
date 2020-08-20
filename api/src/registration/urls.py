from django.views.generic import TemplateView
from django.conf.urls import url

from .views import RegistrationView
from rest_auth.registration.views import VerifyEmailView

urlpatterns = [
    url(r'^$', RegistrationView.as_view(), name='rest_register'),
    url(r'^verify-email/$', VerifyEmailView.as_view(), name='rest_verify_email'),
    url(r'^account-confirm-email/(?P<key>[-:\w]+)/$', TemplateView.as_view(),
        name='account_confirm_email'),
]
