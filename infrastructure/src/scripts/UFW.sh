#!/bin/bash

# Configure firewall
ufw allow 'OpenSSH'
ufw allow 'Nginx Full'
echo y | ufw enable
