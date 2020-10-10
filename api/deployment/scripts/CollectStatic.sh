#!/bin/bash

# Collect static files

# Only collect static if website dir exists
DIR="/home/umigrate/website/"
if [ -d "$DIR" ]; then
	python3 /home/umigrate/api/manage.py collectstatic --noinput
fi

