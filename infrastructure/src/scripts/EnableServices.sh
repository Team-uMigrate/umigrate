#!/bin/bash

# Enable daphne, gunicorn, nginx
systemctl daemon-reload
systemctl enable daphne
systemctl enable gunicorn.socket
systemctl enable redis-server
systemctl reload nginx
