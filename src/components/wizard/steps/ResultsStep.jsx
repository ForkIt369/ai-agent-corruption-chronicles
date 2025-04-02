import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWizard } from '../../../context/WizardContext';
import { FaShare, FaTwitter, FaFacebook, FaLink, FaFileAlt, FaExclamationTriangle } from 'react-icons/fa';
import missions from '../../../data/missions';
import attacks from '../../../data/attacks';
import agentTypes from '../../../data/agentTypes';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

// Glitch animation for cAlith elements
const glitchVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    filter: [
      'none',
      'blur(2px) hue-rotate(90deg)',
      'none',
      'blur(1px) hue-rotate(-90deg)',
      'none'
    ],
    x: [0, -5, 3, -2, 0],
    transition: {
      duration: 0.5,
      filter: {
        repeat: Infinity,
        repeatType: 'mirror',
        duration: 2,
      },
      x: {
        repeat: Infinity,
        repeatType: 'mirror',
        duration: 0.5,
      }
    }
  }
};

export default function ResultsStep() {
  const { state } = useWizard();
  const [isCopied, setIsCopied] = useState(false);
  
  // Get the selected mission, agent type, and attacks
  const selectedMission = missions.find(m => m.id === state.mission);
  const selectedAgentType = selectedMission ? agentTypes[selectedMission.agentType] : null;
  const selectedAttacks = state.attacks.map(id => attacks[id]);
  
  // Handle share actions
  const handleShare = (platform) => {
    const shareText = `Check out my AI Agent Corruption Chronicle: ${selectedMission?.name} corrupted by ${selectedAttacks.map(a => a.name).join(', ')}!`;
    const shareUrl = window.location.href;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl).then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        });
        break;
      default:
        break;
    }
  };
  
  // Format the narrative with sections
  const formatNarrative = (narrative) => {
    if (!narrative) return '';
    
    // Look for section headers in the narrative
    const missionBriefingMatch = narrative.match(/MISSION BRIEFING:([\s\S]*?)(?=CORRUPTION REPORT:|$)/i);
    const corruptionReportMatch = narrative.match(/CORRUPTION REPORT:([\s\S]*?)(?=OUTCOME:|$)/i);
    const outcomeMatch = narrative.match(/OUTCOME:([\s\S]*?)$/i);
    
    // If we found structured sections, format them
    if (missionBriefingMatch && corruptionReportMatch && outcomeMatch) {
      return (
        <>
          <div className="narrative-section alith-section">
            <h4 className="section-title">MISSION BRIEFING</h4>
            <p>{missionBriefingMatch[1].trim()}</p>
          </div>
          
          <div className="narrative-section calith-section">
            <h4 className="section-title">CORRUPTION REPORT</h4>
            <p>{corruptionReportMatch[1].trim()}</p>
          </div>
          
          <motion.div 
            className="narrative-section outcome-section"
            variants={glitchVariants}
          >
            <h4 className="section-title">OUTCOME</h4>
            <p>{outcomeMatch[1].trim()}</p>
          </motion.div>
        </>
      );
    }
    
    // Otherwise, just return the whole narrative
    return <p>{narrative}</p>;
  };
  
  // If no content has been generated, show a message
  if (!state.generatedContent) {
    return (
      <div className="results-step">
        <h2 className="step-title">No Content Generated</h2>
        <p className="step-description">
          Please go back and complete the previous steps to generate content.
        </p>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="results-step"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="step-title"
        variants={itemVariants}
      >
        <span className="alith-text">Alith</span> vs <motion.span className="calith-text" variants={glitchVariants}>cAlith</motion.span>
      </motion.h2>
      
      <div className="results-content-grid">
        <motion.div 
          className="results-narrative-container"
          variants={itemVariants}
        >
          <div className="mission-header">
            <div className="mission-type">
              <span className="label">Agent Type:</span>
              <span className="value">{selectedAgentType?.name}</span>
            </div>
            <div className="mission-name">
              <span className="label">Mission:</span>
              <span className="value">{selectedMission?.name}</span>
            </div>
            <div className="corruption-types">
              <span className="label">Corruption:</span>
              <span className="value">{selectedAttacks.map(a => a.name).join(', ')}</span>
            </div>
          </div>
          
          <div className="narrative-content">
            {formatNarrative(state.generatedContent.narrative)}
          </div>
        </motion.div>
        
        <motion.div 
          className="results-image-container"
          variants={itemVariants}
        >
          <img 
            src={state.generatedContent.imageUrl} 
            alt="Generated corruption scene" 
            className="results-image"
          />
          {state.generatedContent.isFallback && (
            <div className="fallback-indicator">
              <FaExclamationTriangle className="fallback-icon" />
              <span className="fallback-text">Fallback Image</span>
            </div>
          )}
        </motion.div>
      </div>
      
      <motion.div 
        className="share-container"
        variants={itemVariants}
      >
        <h3 className="share-title">
          <FaShare className="share-icon" />
          Share Your Creation
        </h3>
        
        <div className="share-buttons">
          <motion.button
            className="share-button twitter"
            onClick={() => handleShare('twitter')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTwitter className="button-icon" />
            <span>Twitter</span>
          </motion.button>
          
          <motion.button
            className="share-button facebook"
            onClick={() => handleShare('facebook')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaFacebook className="button-icon" />
            <span>Facebook</span>
          </motion.button>
          
          <motion.button
            className="share-button copy"
            onClick={() => handleShare('copy')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLink className="button-icon" />
            <span>{isCopied ? 'Copied!' : 'Copy Link'}</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
