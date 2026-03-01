#!/bin/bash

set -e

echo "Starting Pet Health System..."

cd "$(dirname "$0")/.."

if command -v pnpm &> /dev/null; then
    echo "Using pnpm..."
    pnpm install
elif command -v npm &> /dev/null; then
    echo "Using npm..."
    npm install
fi

echo "Building shared package..."
cd packages/shared && pnpm build && cd ..

echo "Building server..."
cd apps/server && pnpm build && cd ..

echo "Building web..."
cd apps/web && pnpm build && cd ..

echo "Starting services..."
if [ "$1" == "docker" ]; then
    echo "Starting with Docker Compose..."
    cd docker && docker-compose up -d
else
    echo "Starting in development mode..."
    pnpm dev:server &
    pnpm dev:web &
    wait
fi

echo "Pet Health System is running!"
