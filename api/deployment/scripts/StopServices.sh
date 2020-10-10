#!/bin/bash

# Stop services
systemctl stop nginx
systemctl stop redis-server
systemctl start daphne@{0..2}
systemctl stop gunicorn.socket
systemctl stop gunicorn
