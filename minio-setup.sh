#!/bin/sh
set -e

# Check if 'mc' is installed, install if not
if ! command -v mc >/dev/null 2>&1; then
  echo "MinIO Client (mc) not found, installing..."
  brew install minio-mc
else
  echo "MinIO Client (mc) is already installed."
fi


# Add MinIO server alias
mc alias set myminio http://localhost:9000 shootdropdev shootdropdev

# Create the bucket (ignore error if it exists)
mc mb myminio/shootdrop || true

# Set bucket policy to public read
mc anonymous set public myminio/shootdrop

echo 'MinIO setup completed!'