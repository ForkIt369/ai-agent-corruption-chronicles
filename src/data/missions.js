/**
 * Missions for the AI Agent Corruption Chronicles
 * Each mission is associated with a specific agent type
 */

export const missions = [
  // Attention Agent Missions
  {
    id: "content_curator",
    name: "Content Curation Expert",
    agentType: "attention",
    description: "Curate high-quality content for users",
    icon: "/icons/content.svg"
  },
  {
    id: "trend_analyzer",
    name: "Trend Analysis Specialist",
    agentType: "attention",
    description: "Identify and analyze emerging trends",
    icon: "/icons/trend.svg"
  },
  {
    id: "engagement_optimizer",
    name: "Engagement Optimization Agent",
    agentType: "attention",
    description: "Maximize user engagement with content",
    icon: "/icons/engagement.svg"
  },

  // Trust Agent Missions
  {
    id: "fact_checker",
    name: "Fact Verification Guardian",
    agentType: "trust",
    description: "Verify information accuracy and credibility",
    icon: "/icons/fact.svg"
  },
  {
    id: "security_sentinel",
    name: "Security Protocol Sentinel",
    agentType: "trust",
    description: "Maintain secure systems and protect user data",
    icon: "/icons/security.svg"
  },
  {
    id: "consensus_builder",
    name: "Consensus Building Facilitator",
    agentType: "trust",
    description: "Foster agreement and collaboration among stakeholders",
    icon: "/icons/consensus.svg"
  },

  // Liquidity Agent Missions
  {
    id: "defi_stability",
    name: "DeFi Stability Guardian",
    agentType: "liquidity",
    description: "Maintain stability in decentralized finance markets",
    icon: "/icons/defi.svg"
  },
  {
    id: "investment_advisor",
    name: "Investment Strategy Advisor",
    agentType: "liquidity",
    description: "Provide optimal investment recommendations",
    icon: "/icons/investment.svg"
  },
  {
    id: "market_predictor",
    name: "Market Prediction Oracle",
    agentType: "liquidity",
    description: "Forecast market movements and trends",
    icon: "/icons/market.svg"
  }
];

export default missions;
