#!/bin/bash

# Variables passed through using pipelines
DATABASE_PASSWORD=$1

# Only create database if database doesn't exist
if [ -z $(sudo -u postgres psql -lqt | cut -d\| -f 1 | grep umigratedb) ]; then	
	sudo -u postgres psql \
	-c "CREATE DATABASE umigratedb;" \
	-c "CREATE USER umigrate WITH PASSWORD '$DATABASE_PASSWORD';" \
	-c "ALTER ROLE umigrate SET client_encoding TO 'utf8';" \
   	-c "ALTER ROLE umigrate SET default_transaction_isolation TO 'read committed';" \   	
	-c "ALTER ROLE umigrate SET timezone TO 'UTC';" \
	-c "GRANT ALL PRIVILEGES ON DATABASE umigratedb TO umigrate;"
fi

