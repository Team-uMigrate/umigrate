#!/bin/bash

# Stop services
sudo systemctl stop nginx
sudo systemctl stop redis-server
sudo systemctl stop daphne@{0..2}
sudo systemctl stop gunicorn.socket
sudo systemctl stop gunicorn
