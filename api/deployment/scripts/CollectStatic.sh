#!/bin/bash

# Collect static files

# Make the website dir if it doesnt exist 
DIR="/home/umigrate/website/"
if [ ! -d "$DIR" ]; then
	mkdir /home/umigrate/website
fi

source /home/umigrate/venv/bin/activate
py /home/umigrate/api/manage.py collectstatic --noinput
deactivate

