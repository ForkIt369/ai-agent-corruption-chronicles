import { motion } from 'framer-motion';
import { useWizard } from '../../../context/WizardContext';
import { ACTIONS } from '../../../context/WizardContext';
import agentTypes from '../../../data/agentTypes';

// Animation variants for the cards
const cardVariants = {
  initial: { scale: 0.9, opacity: 0, y: 20 },
  animate: (custom) => ({
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.3
    }
  }),
  hover: {
    scale: 1.05,
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.95
  }
};

export default function AgentTypeStep() {
  const { state, dispatch } = useWizard();
  
  const handleSelectAgentType = (agentTypeId) => {
    dispatch({ type: ACTIONS.SELECT_AGENT_TYPE, payload: agentTypeId });
  };
  
  return (
    <div className="agent-type-step">
      <motion.h2
        className="step-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Choose Your AI Agent Type
      </motion.h2>
      
      <motion.p
        className="step-description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Select the type of AI agent you want to corrupt
      </motion.p>
      
      <div className="agent-type-grid">
        {Object.values(agentTypes).map((agent, index) => (
          <motion.div
            key={agent.id}
            className={`agent-card ${state.agentType === agent.id ? 'selected' : ''}`}
            onClick={() => handleSelectAgentType(agent.id)}
            custom={index}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            style={{ 
              borderColor: state.agentType === agent.id ? agent.color : 'transparent',
              backgroundColor: state.agentType === agent.id ? `${agent.color}10` : 'transparent'
            }}
          >
            <div className="agent-icon" style={{ backgroundColor: `${agent.color}30` }}>
              {/* Placeholder for icon - in production, use actual SVG icons */}
              <div className="placeholder-icon" style={{ backgroundColor: agent.color }}></div>
            </div>
            <h3 className="agent-name" style={{ color: agent.color }}>{agent.name}</h3>
            <p className="agent-description">{agent.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
