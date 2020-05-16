#!/bin/bash
DOMAIN_NAME=$1

# Symlinking 
ln -s /etc/nginx/sites-available/$DOMAIN_NAME /etc/nginx/sites-enabled
