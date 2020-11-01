#!/bin/bash

# Variables passed through using pipelines
DOMAIN_NAME=$1

# Install SSL certificates
# We can always run this script, no need to first time run
certbot --nginx -d $DOMAIN_NAME --email 'teamumigrate@gmail.com' --agree-tos -n
