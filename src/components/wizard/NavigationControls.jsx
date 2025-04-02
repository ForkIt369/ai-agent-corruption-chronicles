import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useWizard } from '../../context/WizardContext';
import { ACTIONS } from '../../context/WizardContext';

export default function NavigationControls({ onNext, onBack, canProceed = true, isLastStep = false }) {
  const { state, dispatch } = useWizard();
  
  const handleBack = () => {
    if (state.step > 0) {
      dispatch({ type: ACTIONS.SET_STEP, payload: state.step - 1 });
      if (onBack) onBack();
    }
  };
  
  const handleNext = () => {
    if (canProceed) {
      dispatch({ type: ACTIONS.SET_STEP, payload: state.step + 1 });
      if (onNext) onNext();
    }
  };
  
  const handleReset = () => {
    dispatch({ type: ACTIONS.RESET });
  };
  
  return (
    <div className="navigation-controls">
      {state.step > 0 && (
        <motion.button
          className="nav-button back-button"
          onClick={handleBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaArrowLeft className="button-icon" />
          <span>Back</span>
        </motion.button>
      )}
      
      <motion.button
        className={`nav-button next-button ${!canProceed ? 'disabled' : ''}`}
        onClick={handleNext}
        disabled={!canProceed}
        whileHover={canProceed ? { scale: 1.05 } : {}}
        whileTap={canProceed ? { scale: 0.95 } : {}}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span>{isLastStep ? 'Finish' : 'Next'}</span>
        <FaArrowRight className="button-icon" />
      </motion.button>
      
      {isLastStep && (
        <motion.button
          className="nav-button reset-button"
          onClick={handleReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <span>Create Another</span>
        </motion.button>
      )}
    </div>
  );
}
