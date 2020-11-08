#!/bin/bash

# Collect static files

# Only collect static if website dir exists
DIR="/home/umigrate/website/"
if [ -d "$DIR" ]; then
	py /home/umigrate/api/manage.py collectstatic --noinput
fi
