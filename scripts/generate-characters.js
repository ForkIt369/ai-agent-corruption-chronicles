const fs = require('fs');
const path = require('path');

// Create the public directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Alith character SVG (stable, trustworthy AI)
const alithSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <!-- Background glow -->
  <circle cx="200" cy="200" r="150" fill="url(#alithGlow)" />
  
  <!-- Alith body -->
  <circle cx="200" cy="200" r="80" fill="#ffffff" stroke="#8A2BE2" stroke-width="3" />
  
  <!-- Alith face -->
  <circle cx="170" cy="180" r="10" fill="#8A2BE2" /> <!-- Left eye -->
  <circle cx="230" cy="180" r="10" fill="#8A2BE2" /> <!-- Right eye -->
  <path d="M170 220 Q200 240 230 220" fill="none" stroke="#8A2BE2" stroke-width="3" /> <!-- Smile -->
  
  <!-- Data streams -->
  <path d="M120 120 Q80 160 120 200 Q160 240 120 280" fill="none" stroke="#00A6ED" stroke-width="3" stroke-dasharray="5,5" />
  <path d="M280 120 Q320 160 280 200 Q240 240 280 280" fill="none" stroke="#00A6ED" stroke-width="3" stroke-dasharray="5,5" />
  
  <!-- Orb -->
  <circle cx="200" cy="120" r="20" fill="#8A2BE2" opacity="0.7">
    <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
  </circle>
  
  <!-- Definitions -->
  <defs>
    <radialGradient id="alithGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="#8A2BE2" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#8A2BE2" stop-opacity="0" />
    </radialGradient>
  </defs>
</svg>`;

// cAlith character SVG (corrupted, mischievous AI)
const cAlithSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <!-- Background glow -->
  <circle cx="200" cy="200" r="150" fill="url(#cAlithGlow)" />
  
  <!-- cAlith body -->
  <circle cx="200" cy="200" r="80" fill="#ffffff" stroke="#FF5A8C" stroke-width="3">
    <animate attributeName="r" values="80;82;80" dur="0.5s" repeatCount="indefinite" />
  </circle>
  
  <!-- Glitch effect -->
  <rect x="150" y="170" width="100" height="10" fill="#FF5A8C" opacity="0.5">
    <animate attributeName="x" values="150;145;150" dur="0.2s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="0.5;0.7;0.5" dur="0.3s" repeatCount="indefinite" />
  </rect>
  <rect x="160" y="220" width="80" height="10" fill="#FF5A8C" opacity="0.5">
    <animate attributeName="x" values="160;165;160" dur="0.3s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="0.5;0.7;0.5" dur="0.2s" repeatCount="indefinite" />
  </rect>
  
  <!-- cAlith face -->
  <path d="M170 180 L 160 170 L 170 160" fill="none" stroke="#FF5A8C" stroke-width="3" /> <!-- Left eye -->
  <path d="M230 180 L 240 170 L 230 160" fill="none" stroke="#FF5A8C" stroke-width="3" /> <!-- Right eye -->
  <path d="M170 220 Q200 200 230 220" fill="none" stroke="#FF5A8C" stroke-width="3" /> <!-- Mischievous smile -->
  
  <!-- Corrupted data streams -->
  <path d="M120 120 Q80 160 120 200 Q160 240 120 280" fill="none" stroke="#FF5A8C" stroke-width="3" stroke-dasharray="1,5">
    <animate attributeName="stroke-dasharray" values="1,5;5,1;1,5" dur="1s" repeatCount="indefinite" />
  </path>
  <path d="M280 120 Q320 160 280 200 Q240 240 280 280" fill="none" stroke="#FF5A8C" stroke-width="3" stroke-dasharray="1,5">
    <animate attributeName="stroke-dasharray" values="1,5;5,1;1,5" dur="1s" repeatCount="indefinite" />
  </path>
  
  <!-- Corrupted orb -->
  <circle cx="200" cy="120" r="20" fill="#FF5A8C" opacity="0.7">
    <animate attributeName="cx" values="200;205;195;200" dur="1s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="0.7;1;0.7" dur="0.5s" repeatCount="indefinite" />
  </circle>
  
  <!-- Definitions -->
  <defs>
    <radialGradient id="cAlithGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="#FF5A8C" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#FF5A8C" stop-opacity="0" />
    </radialGradient>
  </defs>
</svg>`;

// Write the SVG files
fs.writeFileSync(path.join(publicDir, 'alith-character.svg'), alithSvg);
console.log('Created alith-character.svg');

fs.writeFileSync(path.join(publicDir, 'calith-character.svg'), cAlithSvg);
console.log('Created calith-character.svg');

console.log('All character SVGs created successfully!');
