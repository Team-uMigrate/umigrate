#!/bin/bash

# Variables passed through using pipelines
SECRET_KEY=$1
DATABASE_PASSWORD=$2
REDIS_PASSWORD=$3
SENDGRID_API_KEY=$4
ALLOWED_HOSTS=$5
STAGE_ENVIRONMENT=$6

# Create virtualenv
pip3 install --upgrade pip
pip3 install virtualenv
virtualenv --python=/usr/bin/python3 /home/umigrate/venv
pip3 install Django djangorestframework django-filter Pillow bcrypt gunicorn daphne psycopg2 django-cors-headers channels channels-redis sendgrid
source /home/umigrate/venv/bin/activate
/home/umigrate/venv/bin/pip install Django djangorestframework django-filter Pillow bcrypt gunicorn daphne psycopg2 django-cors-headers channels channels-redis sendgrid
deactivate
echo SECRET_KEY=$SECRET_KEY >> /home/umigrate/venv/.env
echo DATABASE_PASSWORD=$DATABASE_PASSWORD >> /home/umigrate/venv/.env
echo REDIS_PASSWORD=$REDIS_PASSWORD >> /home/umigrate/venv/.env
echo SENDGRID_API_KEY=$SENDGRID_API_KEY >> /home/umigrate/venv/.env
echo ALLOWED_HOSTS=$ALLOWED_HOSTS >> /home/umigrate/venv/.env
echo STAGE_ENVIRONMENT=$STAGE_ENVIRONMENT >> /home/umigrate/venv/.env
