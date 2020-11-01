#!/bin/bash

# Differentiating between weekly and version backup
fileName=""
if ["$1" = ""]
	then	
		fileName=uMigrateDB-$(date --iso-8601)
	else
		fileName=uMigrateDB-$1
fi

# Backing up the DB
sudo -u postgres pg_dump -U postgres -w -F t umigratedb > /home/umigrate/backups/$fileName.tar
