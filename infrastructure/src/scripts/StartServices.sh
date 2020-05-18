#!/bin/bash

# Starting gunicorn, daphne, redis-server, and nginx
systemctl start gunicorn.socket
systemctl start gunicorn
systemctl start daphne
systemctl start redis-server
systemctl start nginx
systemctl daemon-reload
