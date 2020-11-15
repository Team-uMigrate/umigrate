#!/bin/bash

# Stop services
systemctl stop nginx
systemctl stop redis-server
systemctl stop daphne@{0..2}
systemctl stop gunicorn.socket
systemctl stop gunicorn
