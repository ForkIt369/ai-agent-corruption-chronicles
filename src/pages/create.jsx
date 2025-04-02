import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWizard } from '../context/WizardContext';
import { ACTIONS } from '../context/WizardContext';
import WizardContainer from '../components/wizard/WizardContainer';

export default function CreatePage() {
  const { dispatch } = useWizard();
  
  // Reset the wizard state when the page loads
  useEffect(() => {
    dispatch({ type: ACTIONS.RESET });
  }, [dispatch]);
  
  return (
    <motion.div 
      className="create-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-header">
        <h1 className="page-title">Create Your Corruption Chronicle</h1>
        <p className="page-description">
          Follow the steps below to generate your unique AI agent corruption narrative and image.
        </p>
      </div>
      
      <WizardContainer />
    </motion.div>
  );
}
