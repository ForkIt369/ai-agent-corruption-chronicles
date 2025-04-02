import { motion } from 'framer-motion';
import { useWizard } from '../../../context/WizardContext';
import { ACTIONS } from '../../../context/WizardContext';
import attacks from '../../../data/attacks';
import agentTypes from '../../../data/agentTypes';
import missions from '../../../data/missions';

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

export default function CorruptionStep() {
  const { state, dispatch } = useWizard();
  
  // Filter attacks based on selected agent type
  const filteredAttacks = Object.values(attacks).filter(
    attack => attack.agentType === state.agentType
  );
  
  const handleToggleAttack = (attackId) => {
    const currentAttacks = [...state.attacks];
    const attackIndex = currentAttacks.indexOf(attackId);
    
    if (attackIndex === -1) {
      // Add attack if not already selected (limit to 3)
      if (currentAttacks.length < 3) {
        dispatch({ 
          type: ACTIONS.SELECT_ATTACKS, 
          payload: [...currentAttacks, attackId] 
        });
      }
    } else {
      // Remove attack if already selected
      currentAttacks.splice(attackIndex, 1);
      dispatch({ 
        type: ACTIONS.SELECT_ATTACKS, 
        payload: currentAttacks 
      });
    }
  };
  
  // Get the selected agent type and mission
  const selectedAgentType = agentTypes[state.agentType];
  const selectedMission = missions.find(m => m.id === state.mission);
  
  return (
    <div className="corruption-step">
      <motion.h2
        className="step-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: selectedAgentType?.color }}
      >
        Choose Your Corruption Attacks
      </motion.h2>
      
      <motion.p
        className="step-description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Select up to 3 corruption attacks for your {selectedMission?.name} mission
      </motion.p>
      
      <div className="attacks-counter">
        <span className="counter-text">
          Selected: {state.attacks.length}/3
        </span>
        <div className="counter-dots">
          {[0, 1, 2].map(index => (
            <div 
              key={index} 
              className={`counter-dot ${index < state.attacks.length ? 'active' : ''}`}
              style={{ 
                backgroundColor: index < state.attacks.length ? selectedAgentType?.color : 'transparent',
                borderColor: selectedAgentType?.color
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="attacks-grid">
        {filteredAttacks.map((attack, index) => (
          <motion.div
            key={attack.id}
            className={`attack-card ${state.attacks.includes(attack.id) ? 'selected' : ''}`}
            onClick={() => handleToggleAttack(attack.id)}
            custom={index}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            style={{ 
              borderColor: state.attacks.includes(attack.id) ? attack.color : 'transparent',
              backgroundColor: state.attacks.includes(attack.id) ? `${attack.color}10` : 'transparent'
            }}
          >
            <div className="attack-icon" style={{ backgroundColor: `${attack.color}30` }}>
              {/* Placeholder for icon - in production, use actual SVG icons */}
              <div className="placeholder-icon" style={{ backgroundColor: attack.color }}></div>
            </div>
            <h3 className="attack-name" style={{ color: attack.color }}>{attack.name}</h3>
            <p className="attack-description">{attack.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
