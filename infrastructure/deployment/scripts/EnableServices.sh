#!/bin/bash

# Enable daphne, gunicorn, nginx
# These can always be run, won't harm anything
sudo systemctl daemon-reload
sudo systemctl enable daphne@{0..2}
sudo systemctl enable gunicorn.socket
sudo systemctl enable redis-server
sudo systemctl enable nginx
