#!/bin/bash

# Starting gunicorn, daphne, redis-server, and nginx
systemctl start gunicorn.socket
systemctl start gunicorn
systemctl start daphne@{0..2}
systemctl start redis-server
systemctl start nginx
systemctl daemon-reload
