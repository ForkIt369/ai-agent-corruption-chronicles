import { motion } from 'framer-motion';

export default function ProgressIndicator({ currentStep, totalSteps }) {
  const steps = [
    { id: 0, label: 'Agent Type' },
    { id: 1, label: 'Mission' },
    { id: 2, label: 'Corruption' },
    { id: 3, label: 'Generate' },
    { id: 4, label: 'Results' }
  ];

  return (
    <div className="progress-container">
      <div className="steps-indicator">
        {steps.map((step) => (
          <div 
            key={step.id}
            className={`step ${step.id < currentStep ? 'completed' : ''} ${step.id === currentStep ? 'active' : ''}`}
          >
            <motion.div 
              className="step-circle"
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ 
                scale: step.id === currentStep ? 1.1 : 1,
                opacity: step.id <= currentStep ? 1 : 0.5
              }}
              transition={{ duration: 0.3 }}
            >
              {step.id < currentStep ? '✓' : step.id + 1}
            </motion.div>
            <div className="step-label">
              {step.label}
            </div>
          </div>
        ))}
      </div>
      
      <div className="progress-bar-container">
        <motion.div 
          className="progress-bar"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
