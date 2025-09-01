#!/usr/bin/env bash
# exit on error
set -o errexit

# No need for cd backend/kanban since Render will use this as Root Directory
pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate