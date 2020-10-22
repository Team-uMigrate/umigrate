#!/bin/bash
DOMAIN_NAME=$1

# Symlinking 
# To prevent extra junk in pipelines, we can do ln -sf
ln -s /etc/nginx/sites-available/$DOMAIN_NAME /etc/nginx/sites-enabled
