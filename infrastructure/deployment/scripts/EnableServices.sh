#!/bin/bash

# Enable daphne, gunicorn, nginx
# These can always be run, won't harm anything
systemctl daemon-reload
systemctl enable daphne@{0..2}
systemctl enable gunicorn.socket
systemctl enable redis-server
systemctl enable nginx
