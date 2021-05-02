#!/bin/bash

# Update and install required applications
add-apt-repository ppa:certbot/certbot -y
add-apt-repository ppa:chris-lea/redis-server -y
add-apt-repository ppa:deadsnakes/ppa -y
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" |sudo tee /etc/apt/sources.list.d/pgdg.list
apt update
apt-get install python3.9 python3-pip python3-dev libpq-dev postgresql-13 postgresql-contrib-13 nginx tree virtualenv redis-server python-certbot-nginx fail2ban -y

# Symlink python version
ln -sf /usr/bin/python3.9 /usr/bin/py

