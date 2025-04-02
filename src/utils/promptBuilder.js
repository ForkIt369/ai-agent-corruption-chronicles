import agentTypes from '../data/agentTypes';
import missions from '../data/missions';
import attacks from '../data/attacks';

/**
 * Builds a narrative prompt for the Anthropic Claude API
 * @param {string} missionId - The ID of the selected mission
 * @param {Array} attackIds - Array of selected attack IDs
 * @returns {string} The constructed prompt
 */
export const buildNarrativePrompt = (missionId, attackIds) => {
  // Find the mission
  const mission = missions.find(m => m.id === missionId);
  if (!mission) {
    throw new Error(`Mission not found: ${missionId}`);
  }
  
  // Find the agent type
  const agentType = agentTypes[mission.agentType];
  if (!agentType) {
    throw new Error(`Agent type not found: ${mission.agentType}`);
  }
  
  // Find the attacks
  const selectedAttacks = attackIds.map(id => {
    const attack = attacks[id];
    if (!attack) {
      throw new Error(`Attack not found: ${id}`);
    }
    return attack;
  });
  
  // Get attack names and descriptions
  const attackNames = selectedAttacks.map(attack => attack.name).join(", ");
  const attackDescriptions = selectedAttacks.map(attack => attack.description).join(" and ");
  
  // Build the prompt with the Alith vs cAlith narrative structure
  return `Create a humorous Web3/crypto story about Alith and cAlith with the following structure:

MISSION BRIEFING:
Alith, a responsible AI agent specializing in ${agentType.name}, was assigned to "${mission.name}" with the objective to ${mission.description}.

CORRUPTION REPORT:
cAlith, the mischievous corrupted version of Alith, intercepted this mission and applied the following corruption attacks: ${attackNames}.
These attacks caused ${attackDescriptions}.

OUTCOME:
Describe the hilarious and chaotic outcome when cAlith corrupted this Web3/crypto mission. Include specific details about how the original objective was twisted in absurd ways. Focus on the ridiculous consequences for users and the Web3 ecosystem.

Keep the story concise (400 words max), humorous, and focused on the contrast between Alith's intended mission and cAlith's corrupted outcome. Use Web3/crypto terminology and references.`;
};

/**
 * Helper function to get a descriptive text for an agent type
 * @param {string} type - The agent type name
 * @returns {string} Descriptive text
 */
const getAgentTypeDescription = (type) => {
  const descriptions = {
    'Attention': 'radiating a calm focus and precise awareness, with data visualization interfaces surrounding her',
    'Trust': 'emanating an aura of reliability and security, with encryption symbols and shield-like projections',
    'Liquidity': 'surrounded by flowing streams of digital assets and market data, with financial charts and crypto symbols'
  };
  return descriptions[type] || `representing ${type}`;
};

/**
 * Helper function to get a descriptive text for a mission
 * @param {string} name - The mission name
 * @param {string} description - The mission description
 * @returns {string} Descriptive text
 */
const getMissionDescription = (name, description) => {
  return `${description} in a futuristic Web3 environment with ${name.toLowerCase()} elements`;
};

/**
 * Helper function to get descriptive effects for attacks
 * @param {Array} attacks - Array of attack objects
 * @returns {string} Descriptive text
 */
const getAttackEffects = (attacks) => {
  const effectsByType = {
    'virality': 'surrounded by rapidly multiplying memes and viral content',
    'engagement_overload': 'overwhelmed by notification symbols and engagement metrics',
    'meme_madness': 'creating absurd meme projections and chaotic internet culture references',
    'bias_influence': 'subtly manipulating data streams with biased algorithms',
    'governance_chaos': 'breaking apart governance structures and voting systems',
    'data_leak': 'leaking sensitive data particles and breaching security protocols',
    'reckless_investment': 'throwing crypto tokens recklessly into volatile market vortexes',
    'prediction_madness': 'generating wildly exaggerated market prediction charts',
    'rug_alert': 'pulling digital rugs from under crypto projects with a mischievous grin'
  };
  
  return attacks.map(attack => 
    effectsByType[attack.id] || `causing ${attack.description.toLowerCase()}`
  ).join(', with ');
};

/**
 * Builds an image prompt for the Fal.ai API
 * @param {string} missionId - The ID of the selected mission
 * @param {Array} attackIds - Array of selected attack IDs
 * @param {string} styleId - Optional style identifier
 * @returns {string} The constructed prompt
 */
export const buildImagePrompt = (missionId, attackIds, styleId = "anime") => {
  // Find the mission
  const mission = missions.find(m => m.id === missionId);
  if (!mission) {
    throw new Error(`Mission not found: ${missionId}`);
  }
  
  // Find the agent type
  const agentType = agentTypes[mission.agentType];
  if (!agentType) {
    throw new Error(`Agent type not found: ${mission.agentType}`);
  }
  
  // Find the attacks
  const selectedAttacks = attackIds.map(id => {
    const attack = attacks[id];
    if (!attack) {
      throw new Error(`Attack not found: ${id}`);
    }
    return attack;
  });
  
  // Get attack names for the prompt
  const attackNames = selectedAttacks.map(attack => attack.name).join(", ");
  
  // Build the structured prompt based on the user's template
  return `Anime-style illustration visually depicting corrupted AI Agent scenario explicitly from ${mission.name}, clearly impacted by humorous attacks: ${attackNames}.

Left (Order - Alith clearly female AI):
Calm, confident female AI named Alith, sleek futuristic white bodysuit with glowing cyan accents, stable teal orb explicitly labeled "ALITH", clearly symbolizes original stable intention (${mission.name}).

Right (Chaos - cAlith explicitly female AI, humorous corruption):
Playful, mischievous clearly female AI named cAlith, provocative smirk, vibrant silver-white hair dynamic ponytail, purple-black futuristic armor clearly visually corrupted explicitly by humorous effects from selected attacks. Corrupted teal orb explicitly labeled "ALITH" distorted humorously.

Visual Style Explicitly Defined:
Anime/manga cinematic, masterpiece quality, highly detailed expressive female characters, vivid neon glitch effects explicitly related to chosen corruption attacks, clean sharp lineart, cinematic lighting explicitly clear.`.replace(/\s+/g, ' ').trim();
};

/**
 * Builds a negative prompt for the Fal.ai API
 * @returns {string} The negative prompt
 */
export const buildNegativePrompt = () => {
  return 'male characters, extra text (except orb labeled "ALITH"), speech bubbles, realism, blurry, lowres, inconsistent appearance, distorted features, irrelevant details, watermark, signature, extra limbs, deformed faces, unrealistic proportions, bad anatomy, disfigured, poorly drawn face, mutation, mutated, extra limbs, extra legs, extra arms, disfigured, deformed, cross-eye, body out of frame, out of frame, bad art, poorly drawn, amateur';
};
