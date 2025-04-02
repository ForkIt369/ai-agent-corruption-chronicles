import { motion } from 'framer-motion';
import { useWizard } from '../../../context/WizardContext';
import { ACTIONS } from '../../../context/WizardContext';
import missions from '../../../data/missions';
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

export default function MissionStep() {
  const { state, dispatch } = useWizard();
  
  // Filter missions based on selected agent type
  const filteredMissions = missions.filter(
    mission => mission.agentType === state.agentType
  );
  
  const handleSelectMission = (missionId) => {
    dispatch({ type: ACTIONS.SELECT_MISSION, payload: missionId });
  };
  
  // Get the selected agent type
  const selectedAgentType = agentTypes[state.agentType];
  
  return (
    <div className="mission-step">
      <motion.h2
        className="step-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: selectedAgentType?.color }}
      >
        Choose Your Mission
      </motion.h2>
      
      <motion.p
        className="step-description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Select the specific mission for your {selectedAgentType?.name} agent
      </motion.p>
      
      <div className="mission-grid">
        {filteredMissions.map((mission, index) => (
          <motion.div
            key={mission.id}
            className={`mission-card ${state.mission === mission.id ? 'selected' : ''}`}
            onClick={() => handleSelectMission(mission.id)}
            custom={index}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            style={{ 
              borderColor: state.mission === mission.id ? selectedAgentType?.color : 'transparent',
              backgroundColor: state.mission === mission.id ? `${selectedAgentType?.color}10` : 'transparent'
            }}
          >
            <div className="mission-icon" style={{ backgroundColor: `${selectedAgentType?.color}30` }}>
              {/* Placeholder for icon - in production, use actual SVG icons */}
              <div className="placeholder-icon" style={{ backgroundColor: selectedAgentType?.color }}></div>
            </div>
            <h3 className="mission-name" style={{ color: selectedAgentType?.color }}>{mission.name}</h3>
            <p className="mission-description">{mission.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
