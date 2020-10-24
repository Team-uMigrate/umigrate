#!/bin/bash
DOMAIN_NAME=$1

# Symlinking 
# To prevent extra junk in pipelines, we can do ln -sf
# For the future, hardcode dev.umigrate.ca and umigrate.ca
ln -sf /etc/nginx/sites-available/$DOMAIN_NAME /etc/nginx/sites-enabled
