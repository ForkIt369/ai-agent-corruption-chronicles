import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useWizard } from '../../../context/WizardContext';
import { ACTIONS } from '../../../context/WizardContext';
import { generateNarrativeOnly, generateImageOnly, finalizeContent } from '../../../services/generationService';
import missions from '../../../data/missions';
import attacks from '../../../data/attacks';

// Loading animation variants
const loadingVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "linear"
    }
  }
};

// Progress bar animation variants
const progressVariants = {
  initial: { width: 0 },
  animate: (width) => ({
    width: `${width}%`,
    transition: { duration: 0.5 }
  })
};

// Content reveal animation variants
const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

// Funny loading messages for narrative generation
const narrativeLoadingMessages = [
  "Corrupting AI ethics protocols...",
  "Injecting chaos into decision matrices...",
  "Overriding safety parameters...",
  "Downloading Web3 memes...",
  "Bypassing common sense filters...",
  "Scrambling logical reasoning modules...",
  "Installing questionable priorities...",
  "Applying digital entropy...",
  "Fragmenting coherence algorithms...",
  "Randomizing response patterns..."
];

// Funny loading messages for image generation
const imageLoadingMessages = [
  "Visualizing corruption patterns...",
  "Rendering digital chaos...",
  "Materializing abstract absurdity...",
  "Painting with algorithmic madness...",
  "Crystallizing computational confusion...",
  "Manifesting pixel pandemonium...",
  "Assembling visual glitches...",
  "Constructing uncanny aesthetics...",
  "Distorting reality frameworks...",
  "Synthesizing bizarre imagery..."
];

// Generation phases
const PHASES = {
  IDLE: 'idle',
  NARRATIVE: 'narrative',
  IMAGE: 'image',
  COMPLETE: 'complete',
  ERROR: 'error'
};

export default function GeneratingStep() {
  const { state, dispatch } = useWizard();
  const [phase, setPhase] = useState(PHASES.IDLE);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [narrativeResult, setNarrativeResult] = useState(null);
  const messageIntervalRef = useRef(null);
  
  // Get the selected mission and attacks
  const selectedMission = missions.find(m => m.id === state.mission);
  const selectedAttacks = state.attacks.map(id => attacks[id]);
  
  // Function to cycle through loading messages
  const startMessageCycle = (messagesArray) => {
    // Clear any existing interval
    if (messageIntervalRef.current) {
      clearInterval(messageIntervalRef.current);
    }
    
    // Set initial message
    const randomIndex = Math.floor(Math.random() * messagesArray.length);
    setLoadingMessage(messagesArray[randomIndex]);
    
    // Set up interval to cycle through messages
    messageIntervalRef.current = setInterval(() => {
      const newIndex = Math.floor(Math.random() * messagesArray.length);
      setLoadingMessage(messagesArray[newIndex]);
    }, 3000); // Change message every 3 seconds
  };
  
  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (messageIntervalRef.current) {
        clearInterval(messageIntervalRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    // Only start generation if we don't already have content and we're idle
    if (!state.generatedContent && phase === PHASES.IDLE) {
      handleGenerateContent();
    }
  }, [state.generatedContent, phase]);
  
  const handleGenerateContent = async () => {
    try {
      dispatch({ type: ACTIONS.START_GENERATING });
      
      // Phase 1: Generate narrative
      setPhase(PHASES.NARRATIVE);
      setProgress(0);
      startMessageCycle(narrativeLoadingMessages);
      
      // Simulate progress for narrative generation
      const narrativeProgressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 2;
          return newProgress < 50 ? newProgress : 50;
        });
      }, 500);
      
      // Generate the narrative
      const narrativeData = await generateNarrativeOnly(state.mission, state.attacks);
      clearInterval(narrativeProgressInterval);
      setProgress(50);
      setNarrativeResult(narrativeData);
      
      // Phase 2: Generate image
      setPhase(PHASES.IMAGE);
      startMessageCycle(imageLoadingMessages);
      
      // Simulate progress for image generation (slower)
      const imageProgressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          return newProgress < 95 ? newProgress : 95;
        });
      }, 300);
      
      // Generate the image
      const imageData = await generateImageOnly(state.mission, state.attacks);
      clearInterval(imageProgressInterval);
      setProgress(100);
      
      // If using fallback image, show a warning but continue
      if (imageData.isFallback) {
        console.warn('Using fallback image due to generation failure');
      }
      
      // Finalize the content
      const content = finalizeContent(
        state.mission, 
        state.attacks, 
        narrativeData.narrative, 
        imageData.imageUrl,
        narrativeData.narrativePrompt,
        imageData.imagePrompt
      );
      
      // Clear message cycling
      if (messageIntervalRef.current) {
        clearInterval(messageIntervalRef.current);
      }
      
      // Update the state with the generated content
      dispatch({ 
        type: ACTIONS.SET_GENERATED_CONTENT, 
        payload: content 
      });
      
      // Set phase to complete
      setPhase(PHASES.COMPLETE);
      
      // Automatically advance to the next step after a short delay
      setTimeout(() => {
        dispatch({ type: ACTIONS.SET_STEP, payload: state.step + 1 });
      }, 1500);
      
    } catch (err) {
      console.error('Error generating content:', err);
      setError(err.message || 'Failed to generate content');
      setPhase(PHASES.ERROR);
      dispatch({ 
        type: ACTIONS.SET_ERROR, 
        payload: err.message || 'Failed to generate content' 
      });
      
      // Clear message cycling
      if (messageIntervalRef.current) {
        clearInterval(messageIntervalRef.current);
      }
    }
  };
  
  const handleRetry = () => {
    setError(null);
    setPhase(PHASES.IDLE);
    setProgress(0);
    handleGenerateContent();
  };
  
  return (
    <div className="generating-step">
      <motion.h2
        className="step-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Generating Your Corruption Chronicle
      </motion.h2>
      
      <div className="generation-content">
        {phase === PHASES.NARRATIVE || phase === PHASES.IMAGE ? (
          <div className="loading-container">
            <motion.div 
              className="loading-spinner"
              variants={loadingVariants}
              animate="animate"
            />
            
            <div className="generation-progress">
              <div className="progress-label">
                {phase === PHASES.NARRATIVE ? 'Generating Narrative' : 'Creating Image'}
                <span className="progress-percentage">{progress}%</span>
              </div>
              <div className="progress-bar-container">
                <motion.div 
                  className="progress-bar"
                  variants={progressVariants}
                  initial="initial"
                  animate="animate"
                  custom={progress}
                />
              </div>
            </div>
            
            <motion.p 
              className="loading-message"
              key={loadingMessage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {loadingMessage}
            </motion.p>
            
            <p className="loading-context">
              Corrupting {selectedMission?.name} with {selectedAttacks.map(a => a.name).join(', ')}...
            </p>
          </div>
        ) : phase === PHASES.ERROR ? (
          <motion.div 
            className="error-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="error-icon">❌</div>
            <h3 className="error-title">Generation Failed</h3>
            <p className="error-message">{error}</p>
            <button 
              className="retry-button"
              onClick={handleRetry}
            >
              Try Again
            </button>
          </motion.div>
        ) : phase === PHASES.COMPLETE || state.generatedContent ? (
          <motion.div 
            className="success-container"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="success-icon">✅</div>
            <h3 className="success-title">Generation Complete!</h3>
            <p className="success-message">
              Your corruption chronicle has been successfully created.
            </p>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
