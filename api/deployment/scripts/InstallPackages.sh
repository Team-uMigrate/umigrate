#!/bin/bash

# Install python packages
py -m pip install -r /home/umigrate/api/requirements.txt
source /home/umigrate/venv/bin/activate
/home/umigrate/venv/bin/pip install -r /home/umigrate/api/requirements.txt
deactivate
