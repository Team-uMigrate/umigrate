#!/bin/bash

# Update and install required applications
add-apt-repository ppa:certbot/certbot -y
add-apt-repository ppa:chris-lea/redis-server -y
apt-get install python3-pip python3-dev libpq-dev postgresql postgresql-contrib nginx tree virtualenv redis-server python-certbot-nginx -y
