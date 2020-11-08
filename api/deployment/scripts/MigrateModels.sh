#!/bin/bash

# Migrate models to database
export $(egrep -v '^#' /home/umigrate/venv/.env | xargs) && py /home/umigrate/api/manage.py migrate

