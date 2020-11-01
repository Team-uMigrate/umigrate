#!/bin/bash 

# Create super user
# Create only if SU doesn't exist (do in python)
export $(egrep -v '^#' /home/umigrate/venv/.env | xargs) && python3 /home/umigrate/api/manage.py shell -c "from users.models import CustomUser; users = CustomUser.objects.all().filter(is_superuser=True, email="$REF_TO_EMAIL"); CustomUser.objects.create_superuser('$(SUPERUSER_EMAIL)', '$(SUPERUSER_PASSWORD)') if len(users) == 0 else None"