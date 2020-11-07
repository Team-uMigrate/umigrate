#!/bin/bash

# Stopping nginx, redis-server, daphne, gunicorn
# Stop only if services exist.
STATUS_NGINX="$(systemctl is-active nginx)"
STATUS_REDIS="$(systemctl is-active redis-server)"
STATUS_DAPHNE0="$(systemctl is-active daphne@0)"
STATUS_DAPHNE1="$(systemctl is-active daphne@1)"
STATUS_DAPHNE2="$(systemctl is-active daphne@2)"
STATUS_GUNICORNSOCK="$(systemctl is-active gunicorn.socket)"
STATUS_GUNICORN="$(systemctl is-active gunicorn)"

if [ "$STATUS_NGINX" = "active" ]; then
	systemctl stop nginx
fi

if [ "$STATUS_REDIS" = "active" ]; then
	systemctl stop redis-server
fi

if [ "$STATUS_DAPHNE0" = "active" ] && [ "$STATUS_DAPHNE1" = "active" ] && [ "$STATUS_DAPHNE2" = "active" ]; then
	systemctl stop daphne@{0..2}
fi

if [ "$STATUS_GUNICORNSOCK" = "active" ]; then
	systemctl stop gunicorn.socket
fi

if [ "$STATUS_GUNICORN" = "active" ]; then
	systemctl stop gunicorn
fi
