#!/bin/bash

# Configure firewall
# This can always be run
ufw allow 'OpenSSH'
ufw allow 'Nginx Full'
ufw default deny incoming
ufw default allow outgoing
echo y | ufw enable
