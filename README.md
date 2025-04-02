# AI Agent Corruption Chronicles

A web application that explores the mischievous world of corrupted AI agents through interactive narratives and generated images.

## Overview

AI Agent Corruption Chronicles allows users to:

1. Select an AI agent type (Attention, Trust, or Liquidity)
2. Choose a mission for the agent
3. Apply corruption attacks to the agent
4. Generate a humorous narrative and image showing how the agent was corrupted

The application uses the Anthropic Claude API for generating narratives and the Fal.ai API for generating images.

## Live Demo

Visit [corruptchronicles.com](https://corruptchronicles.com) to see the application in action.

## Technologies Used

- **Frontend**: Next.js, React, Framer Motion
- **APIs**: Anthropic Claude, Fal.ai
- **Deployment**: Vercel
- **Database**: Supabase (future implementation)

## Local Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Anthropic API key
- Fal.ai API key

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-agent-corruption-chronicles.git
   cd ai-agent-corruption-chronicles
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   ANTHROPIC_API_KEY=your_anthropic_api_key
   FinalAlith=your_fal_ai_api_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Deployment Scripts

The project includes several scripts to help with deployment:

```bash
# Run pre-deployment checks
npm run pre-deploy

# Generate Vercel environment variables from .env.local
npm run vercel-env

# Run both pre-deployment checks and generate environment variables
npm run prepare-deploy

# Test a deployed site
npm run test-deploy
```

## Deployment

The application is deployed to Vercel and connected to the corruptchronicles.com domain. 

### Deployment Documentation

- [Deployment Guide](docs/deployment-guide.md) - Step-by-step instructions for deploying to Vercel
- [Squarespace DNS Setup](docs/squarespace-dns-setup.md) - Instructions for configuring DNS in Squarespace

### Environment Variables

The following environment variables need to be set in Vercel:

- `ANTHROPIC_API_KEY`: Your Anthropic API key
- `FinalAlith`: Your Fal.ai API key
- `NEXT_PUBLIC_APP_URL`: Set to https://corruptchronicles.com

## Future Enhancements

- Supabase integration for data persistence
- User authentication
- Social sharing features
- Analytics and monitoring

## Project Structure

- `src/components`: React components
- `src/pages`: Next.js pages
- `src/api`: API client implementations
- `src/data`: Static data for agent types, missions, and attacks
- `src/utils`: Utility functions
- `src/context`: React context providers
- `public`: Static assets
- `scripts`: Utility scripts
- `docs`: Documentation

## License

This project is licensed under the ISC License.
