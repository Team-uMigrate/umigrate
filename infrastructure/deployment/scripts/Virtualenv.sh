#!/bin/bash

# Variables passed through using pipelines
SECRET_KEY=$1
DATABASE_PASSWORD=$2
REDIS_PASSWORD=$3
SENDGRID_API_KEY=$4
DOMAIN_NAME=$5
STAGE_ENVIRONMENT=$6
UW_API_KEY=$7
SAS_TOKEN=$8

# Create virtualenv
pip3 install --upgrade pip
pip3 install virtualenv

# Make dir for venv 
DIR="/home/umigrate/venv/"
if [ ! -d "$DIR" ]; then
	mkdir /home/umigrate/venv
fi

virtualenv --python=/usr/bin/py /home/umigrate/venv

# Send pipeline variables to environment variables file
echo SECRET_KEY=$SECRET_KEY$'\n'\
DATABASE_PASSWORD=$DATABASE_PASSWORD$'\n'\
REDIS_PASSWORD=$REDIS_PASSWORD$'\n'\
SENDGRID_API_KEY=$SENDGRID_API_KEY$'\n'\
DOMAIN_NAME=$DOMAIN_NAME$'\n'\
STAGE_ENVIRONMENT=$STAGE_ENVIRONMENT$'\n'\
UW_API_KEY=$UW_API_KEY$'\n'\
SAS_TOKEN=$SAS_TOKEN$'\n' > /home/umigrate/venv/.env
