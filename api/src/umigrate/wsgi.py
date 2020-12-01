"""
WSGI config for umigrate project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from sentry_sdk.integrations.django import DjangoIntegration
import sentry_sdk

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "umigrate.settings")

# Sentry Initialization
sentry_sdk.init(
    dsn="https://a4946255ae774d7e9c0dd8b5adfa9526@o442315.ingest.sentry.io/5413903",
    integrations=[DjangoIntegration()],
    # traces_sample_rate=1.0,
    # If you wish to associate users to errors (assuming you are using
    # django.contrib.auth) you may enable sending PII data.
    # send_default_pii=True,
)

application = get_wsgi_application()
