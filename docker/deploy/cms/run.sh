#!/bin/sh
set -e
echo $STORAGE_GCP_CREDENTIALS
echo $STORAGE_GCP_CREDENTIALS > /app/gcp-creds.json
directus bootstrap
directus schema apply --yes ./snapshot.yml
directus start
