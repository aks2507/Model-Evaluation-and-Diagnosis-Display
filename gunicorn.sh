#!/bin/sh

gunicorn --bind 0.0.0.0:5000 --workers=5 app:app