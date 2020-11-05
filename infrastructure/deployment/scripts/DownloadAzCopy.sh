#!/bin/bash

# Create azcopy folder
DIR="/home/umigrate/maintenance/azcopy"
if [ ! -d "$DIR" ]
	then
		mkdir /home/umigrate/maintenance/azcopy
fi
cd /home/umigrate/maintenance/azcopy

# Download AzCopy tool
wget -O azcopy_v10.tar.gz https://aka.ms/downloadazcopy-v10-linux && tar -xf azcopy_v10.tar.gz --strip-components=1
