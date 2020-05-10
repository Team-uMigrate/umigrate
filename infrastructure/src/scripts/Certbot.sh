#!/bin/bash

# Variables passed through using pipelines
DOMAIN_NAME=$1

# Install SSL certificates
certbot --nginx -d $DOMAIN_NAME --email 'support@umigrate.ca' --agree-tos -n
