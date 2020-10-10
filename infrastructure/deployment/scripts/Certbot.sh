#!/bin/bash

# Variables passed through using pipelines
DOMAIN_NAME=$1

# Install SSL certificates
certbot --nginx -d $DOMAIN_NAME --email 'teamumigrate@gmail.com' --agree-tos -n
