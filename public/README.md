# AI Agent Corruption Chronicles Art Assets

This directory contains various art assets used throughout the AI Agent Corruption Chronicles application.

## Character SVGs

- `alith-character.svg` - SVG representation of Alith, the stable and trustworthy AI agent
- `calith-character.svg` - SVG representation of cAlith, the corrupted and mischievous version of Alith

These character SVGs can be used in various parts of the application, such as the landing page, results page, and gallery page. They provide a visual representation of the contrast between the stable AI agent (Alith) and its corrupted version (cAlith).

## Icons

The `icons/` directory contains SVG icons used throughout the application:

- Agent Type Icons (attention.svg, trust.svg, liquidity.svg)
- Mission Icons (content.svg, trend.svg, engagement.svg, etc.)
- Attack Icons (virality.svg, engagement-overload.svg, meme-madness.svg, etc.)

See the [icons/README.md](./icons/README.md) file for more details on the available icons.

## Asset Generation

All art assets were generated using Node.js scripts:

- `scripts/generate-icons.js` - Generates all the SVG icons
- `scripts/generate-characters.js` - Generates the Alith and cAlith character SVGs

To regenerate or modify these assets, you can run the scripts with Node.js:

```bash
# Generate all icons
node scripts/generate-icons.js

# Generate character SVGs
node scripts/generate-characters.js
```

## Usage in the Application

These art assets are used throughout the application to provide visual cues and enhance the user experience. The icons are referenced in the data files, while the character SVGs can be used in various components.

Example usage in a React component:

```jsx
import Image from 'next/image';

export default function CharacterDisplay() {
  return (
    <div className="character-container">
      <div className="character">
        <h3>Alith</h3>
        <Image 
          src="/alith-character.svg" 
          alt="Alith - Stable AI Agent" 
          width={200} 
          height={200} 
        />
      </div>
      <div className="character">
        <h3>cAlith</h3>
        <Image 
          src="/calith-character.svg" 
          alt="cAlith - Corrupted AI Agent" 
          width={200} 
          height={200} 
        />
      </div>
    </div>
  );
}
