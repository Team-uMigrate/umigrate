#!/bin/bash

# Migrate models to database
source /home/umigrate/venv/bin/activate
export $(egrep -v '^#' /home/umigrate/venv/.env | xargs) && py /home/umigrate/api/manage.py migrate
deactivate

