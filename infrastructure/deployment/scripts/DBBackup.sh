#!/bin/bash

# Clean backups folder
rm -rf /home/umigrate/backups/*.tar

# Intake environment variable
export $(egrep -v '^#' /home/umigrate/venv/.env | xargs)

# Differentiating between weekly and version backup
fileName=""
if [ -z "$1" ]
	then	
		fileName=$STAGE_ENVIRONMENT-umigratedb-$(date --iso-8601).tar
	else
		fileName=$STAGE_ENVIRONMENT-umigratedb-$1.tar
fi

# Backing up the DB
sudo -u postgres pg_dump -U postgres -w -F t umigratedb > /home/umigrate/backups/$fileName

# Sending backup to Azure
/home/umigrate/maintenance/azcopy/azcopy copy "/home/umigrate/backups/${fileName}" "https://umigratefilestorage.blob.core.windows.net/databasebackups/${SAS_TOKEN}"

