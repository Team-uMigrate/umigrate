#!/bin/bash

# Update the server packages 
apt-get update
apt-get upgrade -y
apt-get autoremove -y
