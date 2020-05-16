"""
Django settings for umigrate project.

Generated by 'django-admin startproject' using Django 3.0.6.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SendGrid
EMAIL_BACKEND = "sendgrid_backend.SendgridBackend"

# Set default SendGrid API key
SENDGRID_API_KEY = os.environ.get('SENDGRID_API_KEY')

# Set allowed hosts
ALLOWED_HOSTS = [os.environ.get('DOMAIN_NAME')]

# Set default database password
DATABASE_PASSWORD = os.environ.get('DATABASE_PASSWORD')

# Set default database password
REDIS_PASSWORD = os.environ.get('REDIS_PASSWORD')

# Get stage environment from environmental variables
STAGE_ENVIRONMENT = os.environ.get('STAGE_ENVIRONMENT')

# Override variables if not running locally
if STAGE_ENVIRONMENT is None:
    STAGE_ENVIRONMENT = 'local'


if STAGE_ENVIRONMENT is 'local':
    SECRET_KEY = 'n_jfl6&v4^9ik8w9324in$&#$gmj5+%n3@ln5d0!cv^%vzsz_x'
    DATABASE_PASSWORD = None
    REDIS_PASSWORD = None
    ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    # Default Django apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Rest framework apps
    'rest_framework',
    'django_filters',

    # User registration and authentication apps
    'rest_framework.authtoken',
    'rest_auth',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'rest_auth.registration',

    # Channels apps
    'channels',
    'channels_redis',

    # Project apps
    'ads',
    'events',
    'housing',
    'jobs',
    'messaging',
    'polls',
    'posts',
    'users',
]

# Middleware

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'corsheaders.middleware.CorsPostCsrfMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Session settings

SESSION_ENGINE = 'django.contrib.sessions.backends.cached_db'
SESSION_COOKIE_SAMESITE = 'Strict'
SESSION_COOKIE_SECURE = True
SESSION_SAVE_EVERY_REQUEST = True
SESSION_COOKIE_AGE = 1800

# CORS & CSRF settings

CSRF_COOKIE_SAMESITE = 'Strict'
CSRF_COOKIE_SECURE = True
CSRF_TRUSTED_ORIGINS = [ALLOWED_HOSTS]
CSRF_USE_SESSIONS = True
CORS_ALLOW_CREDENTIALS = False
CORS_ORIGIN_ALLOW_ALL = False
CORS_ORIGIN_WHITELIST = [ALLOWED_HOSTS]

if STAGE_ENVIRONMENT is 'local':
    SESSION_COOKIE_SAMESITE = 'Lax'
    SESSION_COOKIE_SECURE = False
    CSRF_COOKIE_SAMESITE = 'Lax'
    CSRF_COOKIE_SECURE = False
    CORS_ALLOW_CREDENTIALS = True
    CORS_ORIGIN_ALLOW_ALL = True

ROOT_URLCONF = 'umigrate.urls'

# Rest framework settings

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
}

# Email settings

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
DEFAULT_FROM_EMAIL = 'support@umigrate.ca'
EMAIL_HOST = 'smtp.sendgrid.net'
EMAIL_HOST_USER = 'apikey'
EMAIL_HOST_PASSWORD = SENDGRID_API_KEY
EMAIL_PORT = 587
EMAIL_USE_TLS = True

if STAGE_ENVIRONMENT is 'local':
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Templates

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, '../static')]
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'umigrate.wsgi.application'

ASGI_APPLICATION = 'umigrate.routing.application'

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

if STAGE_ENVIRONMENT == 'local':
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        },
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'umigratedb',
            'USER': 'umigrate',
            'PASSWORD': DATABASE_PASSWORD,
            'HOST': 'localhost',
            'PORT': '',
        },
    }

# Channels configuration

if STAGE_ENVIRONMENT == 'local':
    CHANNEL_LAYERS = {
        'default': {
            'BACKEND': 'channels_redis.core.RedisChannelLayer',
            'CONFIG': {
                "hosts": [('127.0.0.1', 6379)],
            },
        },
    }
else:
    CHANNEL_LAYERS = {
        'default': {
            'BACKEND': 'channels_redis.core.RedisChannelLayer',
            'CONFIG': {
                "hosts": [f'redis://:{REDIS_PASSWORD}@127.0.0.1:6379/0'],
            },
        },
    }

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

PASSWORD_RESET_TIMEOUT_DAYS = 1

# Authentication
AUTH_USER_MODEL = 'users.CustomUser'
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_DEFAULT_HTTP_PROTOCOL = 'https'
ACCOUNT_EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL = '/auth/login/'
ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL = '/auth/login/'
SITE_ID = 1

if STAGE_ENVIRONMENT is 'local':
    ACCOUNT_DEFAULT_HTTP_PROTOCOL = 'http'

REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'users.serializers.UserDetailSerializer',
}

# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, '../website/static'),
]
STATIC_ROOT = os.path.join(BASE_DIR, '../static')

# Media (Images)

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, '../media')
