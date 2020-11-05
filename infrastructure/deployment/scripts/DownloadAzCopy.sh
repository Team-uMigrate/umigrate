#!/bin/bash

mkdir /home/umigrate/maintenance/azcopy
cd /home/umigrate/maintenance/azcopy
wget -O azcopy_v10.tar.gz https://aka.ms/downloadazcopy-v10-linux && tar -xf azcopy_v10.tar.gz --strip-components=1

