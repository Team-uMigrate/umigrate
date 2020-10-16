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

# Run only if path /home/umigrate/venv doesn't exist.
DIR="/home/umigrate/venv/"
if [ ! -d "$DIR" ]; then
	virtualenv --python=/usr/bin/python3 /home/umigrate/venv
fi

# Send pipeline variables to environment variables file
echo SECRET_KEY=$SECRET_KEY$'\n'\
DATABASE_PASSWORD=$DATABASE_PASSWORD$'\n'\
REDIS_PASSWORD=$REDIS_PASSWORD$'\n'\
SENDGRID_API_KEY=$SENDGRID_API_KEY$'\n'\
DOMAIN_NAME=$DOMAIN_NAME$'\n'\
STAGE_ENVIRONMENT=$STAGE_ENVIRONMENT$'\n'\
UW_API_KEY=$UW_API_KEY$'\n' > /home/umigrate/venv/.env
