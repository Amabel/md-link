#!/bin/bash

# Constants
NC='\033[0m' # No Color
RED='\033[1;31m'
GREEN='\033[1;32m'

FUNCTION_NAME=${PWD##*/}

echo "Checking files...\n"

if ! [ -d "node_modules" ]; then
  echo -e "${RED}Failed to find folder: node_modules"
  echo -e "${RED}Please run 'npm install' first."
  exit 1
fi

if ! [ -d "dist" ]; then
  echo -e "${RED}Failed to find folder: dist"
  echo -e "${RED}Please run 'npm run build' first."
  exit 1
fi

if ! type "aws" > /dev/null; then
  echo -e "${RED}Failed to find command: aws"
  echo -e "${RED}Please install AWS Command Line Interface"
  exit 1
fi

echo "Removing existing function.zip..."
rm -f function.zip

echo "Zipping files..."
zip -qr function.zip dist/*.js

echo "uploading ${FUNCTION_NAME}..."
aws lambda update-function-code --function-name ${FUNCTION_NAME} --zip-file fileb://function.zip

echo "Cleanning up..."
rm -f function.zip
