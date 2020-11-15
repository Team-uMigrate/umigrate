#!/bin/bash

# Start services
sudo systemctl start gunicorn.socket
sudo systemctl start gunicorn
sudo systemctl start daphne@{0..2}
sudo systemctl start redis-server
sudo systemctl start nginx

