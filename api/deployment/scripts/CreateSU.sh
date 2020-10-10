#!/bin/bash 

# Create super user
export $(egrep -v '^#' /home/umigrate/venv/.env | xargs) && python3 /home/umigrate/api/manage.py shell -c "from users.models import CustomUser; CustomUser.objects.create_superuser('$(SUPERUSER_EMAIL)', '$(SUPERUSER_PASSWORD)')"
