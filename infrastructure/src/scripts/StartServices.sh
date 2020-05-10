#!/bin/bash

# Starting daphne, gunicorn, and reload daemon
systemctl start daphne
systemctl start gunicorn
systemctl start gunicorn.socket
systemctl start redis-server
systemctl start nginx
systemctl daemon-reload
