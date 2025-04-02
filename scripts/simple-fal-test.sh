#!/bin/bash

echo "Testing Fal.ai connection with FinalAlith key..."

# Directly read the key from .env.local
KEY=$(grep "FinalAlith" .env.local | cut -d'=' -f2)

if [ -z "$KEY" ]; then
  echo "Error: FinalAlith key not found in .env.local"
  exit 1
fi

echo "Using API key: ${KEY:0:4}...${KEY: -4}"

# Test the connection
echo "Testing primary endpoint: https://fal.run/fal-ai/flux-pro/v1.1-ultra"
RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X POST \
  -H "Authorization: Key $KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt":"test","aspect_ratio":"1:1","output_format":"jpeg","safety_tolerance":"2","num_images":1}' \
  https://fal.run/fal-ai/flux-pro/v1.1-ultra)

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ]; then
  echo "✅ Connection successful (HTTP 200)"
  echo "Response snippet: ${RESPONSE_BODY:0:100}..."
else
  echo "❌ Connection failed (HTTP $HTTP_CODE)"
  echo "Error: $RESPONSE_BODY"
fi
