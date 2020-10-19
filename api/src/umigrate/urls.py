"""umigrate URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from allauth.account.views import confirm_email
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .settings import ALLOWED_HOSTS, STAGE_ENVIRONMENT
from common.constants.choices import trigger_error


schema_view = get_schema_view(
    openapi.Info(
        title='uMigrate API',
        default_version='',
    ),
    public=False,
    permission_classes=(permissions.AllowAny,),
    url=None if STAGE_ENVIRONMENT == 'local' else f'https://{ALLOWED_HOSTS[0]}',
)


# URL patterns for the API
urlpatterns = [
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('admin/', admin.site.urls),
    path('auth/', include('rest_auth.urls')),
    path('auth/registration/', include('registration.urls')),
    url(r'^account/', include('allauth.urls')),
    path('accounts/', include('allauth.urls')),
    url(r'^accounts-rest/registration/account-confirm-email/(?P<key>.+)/$', confirm_email, name='account_confirm_email'),
    path('api/ads/', include('ads.urls')),
    path('api/events/', include('events.urls')),
    path('api/listings/', include('listings.urls')),
    path('api/', include('jobs.urls')),
    path('api/rooms/', include('messaging.urls')),
    path('api/polls/', include('polls.urls')),
    path('api/posts/', include('posts.urls')),
    path('api/users/', include('users.urls')),
    path('api/uploads/photos/', include('photos.urls')),

    path('sentry-debug/', trigger_error)
]
