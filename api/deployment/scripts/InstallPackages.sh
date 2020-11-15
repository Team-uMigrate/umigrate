#!/bin/bash

# Install python packages
pip3 install -r /home/umigrate/api/requirements.txt
source /home/umigrate/venv/bin/activate
/home/umigrate/venv/bin/pip install -r /home/umigrate/api/requirements.txt
deactivate

