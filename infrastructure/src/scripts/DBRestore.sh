#!/bin/bash

# Refer to file name passed in through Azure
file=$1

# Delete the current DB
sudo -u postgres psql -c "DROP DATABASE umigratedb;"

# Create a new DB
sudo -u postgres psql -c "CREATE DATABASE umigratedb;"

# Restoring the DB
sudo -u postgres pg_restore -d umigratedb $file
