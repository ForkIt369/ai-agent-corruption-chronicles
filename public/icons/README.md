# AI Agent Corruption Chronicles Icons

This directory contains SVG icons used throughout the AI Agent Corruption Chronicles application.

## Icon Categories

### Agent Type Icons
- `attention.svg` - Icon for the Attention agent type
- `trust.svg` - Icon for the Trust agent type
- `liquidity.svg` - Icon for the Liquidity agent type

### Mission Icons
- `content.svg` - Icon for Content Curation Expert mission
- `trend.svg` - Icon for Trend Analysis Specialist mission
- `engagement.svg` - Icon for Engagement Optimization Agent mission
- `fact.svg` - Icon for Fact Verification Guardian mission
- `security.svg` - Icon for Security Protocol Sentinel mission
- `consensus.svg` - Icon for Consensus Building Facilitator mission
- `defi.svg` - Icon for DeFi Stability Guardian mission
- `investment.svg` - Icon for Investment Strategy Advisor mission
- `market.svg` - Icon for Market Prediction Oracle mission

### Attack Icons
- `virality.svg` - Icon for Virality attack
- `engagement-overload.svg` - Icon for Engagement Overload attack
- `meme-madness.svg` - Icon for Meme Madness attack
- `bias.svg` - Icon for Bias & Influence attack
- `governance.svg` - Icon for Governance Chaos attack
- `data-leak.svg` - Icon for Data Leak attack
- `reckless.svg` - Icon for Reckless Investment attack
- `prediction.svg` - Icon for Prediction Madness attack
- `rug.svg` - Icon for Rug Alert attack

## Icon Generation

These icons were generated using the `generate-icons.js` script located in the `scripts` directory. The script creates SVG icons based on predefined templates.

To regenerate or modify the icons, you can:

1. Edit the icon definitions in `scripts/generate-icons.js`
2. Run the script with Node.js:
   ```
   node scripts/generate-icons.js
   ```

## Icon Design

All icons follow a consistent design language:
- Simple, recognizable shapes
- Stroke-based design (no fills)
- Color-coded by category (agent type, mission, attack)
- 24x24 viewBox for consistent sizing

## Usage in the Application

These icons are referenced in the data files:
- `src/data/agentTypes.js` - References agent type icons
- `src/data/missions.js` - References mission icons
- `src/data/attacks.js` - References attack icons

The application displays these icons in various components, including:
- Agent type selection step
- Mission selection step
- Corruption attack selection step
- Results display
