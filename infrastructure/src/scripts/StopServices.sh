#!/bin/bash

# Stopping nginx, redis-server, daphne, gunicorn
systemctl stop nginx
systemctl stop redis-server
systemctl stop daphne@{0..2}
systemctl stop gunicorn.socket
systemctl stop gunicorn
