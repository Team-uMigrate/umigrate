#!/bin/bash

# Stopping nginx, redis-server, daphne, gunicorn
systemctl stop nginx
systemctl stop redis-server
systemctl stop daphne
systemctl stop gunicorn
systemctl stop gunicorn.socket
