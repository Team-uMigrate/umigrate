#!/bin/bash

# Configure firewall
# This can always be run
sudo ufw allow 'OpenSSH'
sudo ufw allow 'Nginx Full'
echo y | sudo ufw enable
