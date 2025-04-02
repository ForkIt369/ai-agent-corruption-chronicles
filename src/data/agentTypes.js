/**
 * Agent types for the AI Agent Corruption Chronicles
 * Each agent type has a set of associated attacks
 */

export const agentTypes = {
  attention: {
    id: "attention",
    name: "Attention",
    description: "AI agents focused on capturing and directing user attention",
    icon: "/icons/attention.svg",
    color: "#FF5A5F",
    attacks: ["virality", "engagement_overload", "meme_madness"]
  },
  trust: {
    id: "trust",
    name: "Trust",
    description: "AI agents designed to build and maintain user trust",
    icon: "/icons/trust.svg",
    color: "#00A699",
    attacks: ["bias_influence", "governance_chaos", "data_leak"]
  },
  liquidity: {
    id: "liquidity",
    name: "Liquidity",
    description: "AI agents managing financial assets and predictions",
    icon: "/icons/liquidity.svg",
    color: "#FFB400",
    attacks: ["reckless_investment", "prediction_madness", "rug_alert"]
  }
};

export default agentTypes;
