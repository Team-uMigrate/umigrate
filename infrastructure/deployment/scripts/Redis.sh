#!/bin/bash

# Variables passed through using pipelines
REDIS_PASSWORD=$1

# Set Redis password and configure Redis to be supervised by systemd
# TODO: fix supervised no to change to supervised systemd
sudo sed -i "s/# requirepass foobared/requirepass $REDIS_PASSWORD/g" /etc/redis/redis.conf
sudo sed -i "s/supervised no/supervised systemd/g" /etc/redis/redis.conf
