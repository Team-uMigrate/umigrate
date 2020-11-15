#!/bin/bash

# Starting gunicorn, daphne, redis-server, and nginx
# This is always run
systemctl daemon-reload
systemctl start gunicorn.socket
systemctl start gunicorn
systemctl start daphne@{0..2}
systemctl start redis-server
systemctl start nginx
