#!/bin/bash

# Start only if ALL services exist
# Start services
systemctl start gunicorn.socket
systemctl start gunicorn
systemctl start daphne@{0..2}
systemctl start redis-server
systemctl start nginx

