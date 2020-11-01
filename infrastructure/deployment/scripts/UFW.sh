#!/bin/bash

# Configure firewall
# This can always be run
ufw allow 'OpenSSH'
ufw allow 'Nginx Full'
echo y | ufw enable
