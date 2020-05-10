#!/bin/bash

# Variables passed through using pipelines
REDIS_PASSWORD=$1

# Set Redis password and configure Redis to be supervised by systemd
sed -i "s/# requirepass foobared/requirepass $REDIS_PASSWORD/g" /etc/redis/redis.conf
sed -i ":a;N;$!ba; s/supervised no/supervised systemd/2" /etc/redis/redis.conf
