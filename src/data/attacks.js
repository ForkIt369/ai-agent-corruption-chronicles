/**
 * Corruption attacks for the AI Agent Corruption Chronicles
 * Each attack is associated with a specific agent type
 */

export const attacks = {
  // Attention Agent Attacks
  virality: {
    id: "virality",
    name: "Virality",
    description: "Uncontrolled viral behavior",
    agentType: "attention",
    icon: "/icons/virality.svg",
    color: "#FF7E79"
  },
  engagement_overload: {
    id: "engagement_overload",
    name: "Engagement Overload",
    description: "Exaggerated interaction chaos",
    agentType: "attention",
    icon: "/icons/engagement-overload.svg",
    color: "#FF9E7A"
  },
  meme_madness: {
    id: "meme_madness",
    name: "Meme Madness",
    description: "Absurd meme-centric outcomes",
    agentType: "attention",
    icon: "/icons/meme-madness.svg",
    color: "#FFBD7A"
  },

  // Trust Agent Attacks
  bias_influence: {
    id: "bias_influence",
    name: "Bias & Influence",
    description: "Hilarious skewed decisions",
    agentType: "trust",
    icon: "/icons/bias.svg",
    color: "#7ADEFF"
  },
  governance_chaos: {
    id: "governance_chaos",
    name: "Governance Chaos",
    description: "Ridiculous governance failures",
    agentType: "trust",
    icon: "/icons/governance.svg",
    color: "#7AC9FF"
  },
  data_leak: {
    id: "data_leak",
    name: "Data Leak",
    description: "Humorous exposure scenarios",
    agentType: "trust",
    icon: "/icons/data-leak.svg",
    color: "#7AB5FF"
  },

  // Liquidity Agent Attacks
  reckless_investment: {
    id: "reckless_investment",
    name: "Reckless Investment",
    description: "Absurd investment disasters",
    agentType: "liquidity",
    icon: "/icons/reckless.svg",
    color: "#FFE07A"
  },
  prediction_madness: {
    id: "prediction_madness",
    name: "Prediction Madness",
    description: "Comically exaggerated forecasts",
    agentType: "liquidity",
    icon: "/icons/prediction.svg",
    color: "#FFCF7A"
  },
  rug_alert: {
    id: "rug_alert",
    name: "Rug Alert",
    description: "Funny, disastrous rug pulls",
    agentType: "liquidity",
    icon: "/icons/rug.svg",
    color: "#FFBD7A"
  }
};

export default attacks;
