import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWizard } from '../../context/WizardContext';
import ProgressIndicator from './ProgressIndicator';
import NavigationControls from './NavigationControls';
import AgentTypeStep from './steps/AgentTypeStep';
import MissionStep from './steps/MissionStep';
import CorruptionStep from './steps/CorruptionStep';
import GeneratingStep from './steps/GeneratingStep';
import ResultsStep from './steps/ResultsStep';

// Animation variants for step transitions
const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

export default function WizardContainer({ isEmbedded = false }) {
  const { state } = useWizard();
  const [direction, setDirection] = useState(1);
  const totalSteps = 5; // Total number of steps in the wizard
  
  // Set direction based on step change
  useEffect(() => {
    const handleStepChange = (newStep) => {
      if (newStep > state.step) {
        setDirection(1); // Forward
      } else {
        setDirection(-1); // Backward
      }
    };
    
    handleStepChange(state.step);
  }, [state.step]);
  
  // Determine if user can proceed to next step
  const canProceed = () => {
    switch (state.step) {
      case 0: // Agent Type
        return !!state.agentType;
      case 1: // Mission
        return !!state.mission;
      case 2: // Corruption
        return state.attacks && state.attacks.length > 0;
      case 3: // Generating
        return !!state.generatedContent;
      default:
        return true;
    }
  };
  
  // Render the current step
  const renderStep = () => {
    switch (state.step) {
      case 0:
        return <AgentTypeStep />;
      case 1:
        return <MissionStep />;
      case 2:
        return <CorruptionStep />;
      case 3:
        return <GeneratingStep />;
      case 4:
        return <ResultsStep />;
      default:
        return <AgentTypeStep />;
    }
  };
  
  return (
    <div className={`wizard-container ${isEmbedded ? 'embedded' : ''}`}>
      <ProgressIndicator currentStep={state.step} totalSteps={totalSteps} />
      
      <div className="step-content">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={state.step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="step-container"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <NavigationControls 
        canProceed={canProceed()}
        isLastStep={state.step === totalSteps - 1}
      />
    </div>
  );
}
