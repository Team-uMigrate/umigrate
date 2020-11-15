#!/bin/bash

# Starting gunicorn, daphne, redis-server, and nginx
# This is always run
sudo systemctl daemon-reload
sudo systemctl start gunicorn.socket
sudo systemctl start gunicorn
sudo systemctl start daphne@{0..2}
sudo systemctl start redis-server
sudo systemctl start nginx
