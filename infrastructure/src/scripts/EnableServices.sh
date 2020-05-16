#!/bin/bash

# Enable daphne, gunicorn, nginx
systemctl enable daphne
systemctl enable gunicorn.socket
systemctl enable redis-server
systemctl daemon-reload
systemctl reload nginx
