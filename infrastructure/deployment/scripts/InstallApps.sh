#!/bin/bash

# Update and install required applications
sudo add-apt-repository ppa:certbot/certbot -y
sudo add-apt-repository ppa:chris-lea/redis-server -y
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt-get install python3.7 python3-pip python3-dev libpq-dev postgresql-13 postgresql-contrib-13 nginx tree virtualenv redis-server python-certbot-nginx -y

# Symlink python version
sudo ln -sf /usr/bin/python3.7 /usr/bin/py

