#!/bin/bash

# Collect static files

# Make the website dir if it doesnt exist 
WEBSITE_DIR="/home/umigrate/website/"
if [ ! -d "$WEBSITE_DIR" ]; then
	mkdir /home/umigrate/website
fi

# Make the static dir if it doesnt exist 
STATIC_DIR="/home/umigrate/website/static/"
if [ ! -d "$STATIC_DIR" ]; then
	mkdir /home/umigrate/website/static
fi

source /home/umigrate/venv/bin/activate
py /home/umigrate/api/manage.py collectstatic --noinput
deactivate
