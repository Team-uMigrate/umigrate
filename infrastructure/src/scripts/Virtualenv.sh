#!/bin/bash

# Variables passed through using pipelines
SECRET_KEY=$1
DATABASE_PASSWORD=$2
REDIS_PASSWORD=$3
SENDGRID_API_KEY=$4
DOMAIN_NAME=$5
STAGE_ENVIRONMENT=$6
UW_API_KEY=$7

# Create virtualenv
pip3 install --upgrade pip
pip3 install virtualenv
virtualenv --python=/usr/bin/python3 /home/umigrate/venv

# Send pipeline variables to environment variables file
echo SECRET_KEY=$SECRET_KEY > /home/umigrate/venv/.env
echo DATABASE_PASSWORD=$DATABASE_PASSWORD > /home/umigrate/venv/.env
echo REDIS_PASSWORD=$REDIS_PASSWORD > /home/umigrate/venv/.env
echo SENDGRID_API_KEY=$SENDGRID_API_KEY > /home/umigrate/venv/.env
echo DOMAIN_NAME=$DOMAIN_NAME > /home/umigrate/venv/.env
echo STAGE_ENVIRONMENT=$STAGE_ENVIRONMENT > /home/umigrate/venv/.env
echo UW_API_KEY=$UW_API_KEY > /home/umigrate/venv/.env
