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
from django.conf.urls import url, re_path
from django.contrib import admin
from django.urls import path, include
from rest_auth.views import PasswordResetConfirmView
from rest_framework import permissions
from django.contrib.sites.models import Site
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .settings import STAGE_ENVIRONMENT, SITE, SITE_ID
from common.constants.choices import trigger_error

# Set site
# site = Site.objects.get(id=SITE_ID)
# site.name = SITE
# site.domain = SITE
# site.save()

schema_view = get_schema_view(
    openapi.Info(
        title="uMigrate API",
        default_version="",
    ),
    public=False,
    permission_classes=(permissions.AllowAny,),
    url=None if STAGE_ENVIRONMENT == "local" else f"https://{SITE}",
)


# URL patterns for the API
urlpatterns = [
    url(
        r"^swagger(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    url(
        r"^swagger/$",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("admin/", admin.site.urls),
    path("api/ads/", include("ads.urls")),
    path("api/comments/", include("comments.urls")),
    path("api/events/", include("events.urls")),
    path("api/listings/", include("listings.urls")),
    path("api/", include("jobs.urls")),
    path("api/rooms/", include("messaging.urls")),
    path("api/polls/", include("polls.urls")),
    path("api/posts/", include("posts.urls")),
    path("api/users/", include("users.urls")),
    path("api/uploads/photos/", include("photos.urls")),
    path("api/sentry-debug/", trigger_error),
    path("api/", include("rest_auth.urls")),
    url(r"^api/", include("django.contrib.auth.urls")),
    re_path(
        r"^api/password/reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path("api/registration/", include("registration.urls")),
    path("api/registration/", include("rest_auth.registration.urls")),
    path("api/", include("allauth.urls")),
]
