#!/bin/bash

# Migrate models to database
export $(egrep -v '^#' /home/umigrate/venv/.env | xargs) && python3 /home/umigrate/api/manage.py migrate

