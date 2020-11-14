#!/bin/bash

# Create backups folder
DIR="/home/umigrate/backups"
if [ ! -d "$DIR" ]
	then
		mkdir /home/umigrate/backups
fi

# Clean backups folder
rm -rf /home/umigrate/backups/*.tar

# Intake file name
fileName=""
if [ -z "$1" ]
	then
		echo NO FILE NAME SPECIFIED, EXITING...
		exit -1
	else
  		fileName=$1

		#Download the file from Azure
		/home/umigrate/maintenance/azcopy/azcopy copy --recursive "https://umigratefilestorage.blob.core.windows.net/databasebackups/${fileName}${SAS_TOKEN}" /home/umigrate/backups/

		#Delete the current DB
		sudo -u postgres psql -c "DROP DATABASE umigratedb;"

  		#Create a new DB
		sudo -u postgres psql -c "CREATE DATABASE umigratedb;"

  		#Restoring the DB
  		sudo -u postgres pg_restore -d umigratedb /home/umigrate/backups/$fileName
fi
