#!/bin/bash

# Stopping daphne, gunicorn, and reload daemon
systemctl stop daphne
systemctl stop gunicorn
systemctl stop gunicorn.socket
systemctl stop redis-server
systemctl stop nginx
