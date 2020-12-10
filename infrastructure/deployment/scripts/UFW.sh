#!/bin/bash

# Configure firewall
# This can always be run
ufw limit 'OpenSSH'
ufw allow 'Nginx Full'
echo y | ufw enable
