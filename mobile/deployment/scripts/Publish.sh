#!/bin/bash
DIR=$1
SUPERUSER_PASSWORD=$2

cd $DIR/_umigrate-mobile/drop
expo login -u teamumigrate -p $SUPERUSER_PASSWORD 
expo publish

