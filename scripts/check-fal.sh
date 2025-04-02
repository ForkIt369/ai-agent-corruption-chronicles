#!/bin/bash

echo "Testing Fal.ai connection..."

# Read API key from .env.local
if [ -f .env.local ]; then
  KEY=$(grep "FinalAlith" .env.local | cut -d'=' -f2)
else
  echo "Error: .env.local file not found"
  exit 1
fi

if [ -z "$KEY" ]; then
  echo "Error: No API key found in .env.local"
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
  
  # Try fallback endpoint
  echo "Testing fallback endpoint: https://fal.run/fal-ai/fast-sdxl"
  FALLBACK_RESPONSE=$(curl -s -w "\n%{http_code}" \
    -X POST \
    -H "Authorization: Key $KEY" \
    -H "Content-Type: application/json" \
    -d '{"prompt":"test","width":256,"height":256,"num_inference_steps":5}' \
    https://fal.run/fal-ai/fast-sdxl)
    
  FALLBACK_HTTP_CODE=$(echo "$FALLBACK_RESPONSE" | tail -n1)
  FALLBACK_RESPONSE_BODY=$(echo "$FALLBACK_RESPONSE" | sed '$d')
  
  if [ "$FALLBACK_HTTP_CODE" -eq 200 ]; then
    echo "✅ Fallback connection successful (HTTP 200)"
    echo "Response snippet: ${FALLBACK_RESPONSE_BODY:0:100}..."
  else
    echo "❌ Fallback connection failed (HTTP $FALLBACK_HTTP_CODE)"
    echo "Error: $FALLBACK_RESPONSE_BODY"
  fi
fi
