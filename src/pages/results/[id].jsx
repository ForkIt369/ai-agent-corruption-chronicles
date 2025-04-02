import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft, FaShare, FaTwitter, FaFacebook, FaLink } from 'react-icons/fa';
import { getCreationById } from '../../utils/sessionManager';
import missions from '../../data/missions';
import attacks from '../../data/attacks';
import agentTypes from '../../data/agentTypes';

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

export default function ResultPage() {
  const router = useRouter();
  const { id } = router.query;
  const [creation, setCreation] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load the creation from localStorage when the ID is available
  useEffect(() => {
    if (id) {
      const loadedCreation = getCreationById(id);
      setCreation(loadedCreation);
      setIsLoading(false);
    }
  }, [id]);
  
  // Get mission and attack details
  const getMissionName = (missionId) => {
    const mission = missions.find(m => m.id === missionId);
    return mission ? mission.name : 'Unknown Mission';
  };
  
  const getAttackDetails = (attackIds) => {
    return attackIds.map(id => {
      const attack = attacks[id];
      return attack ? attack : null;
    }).filter(Boolean);
  };
  
  // Handle share actions
  const handleShare = (platform) => {
    if (!creation) return;
    
    const shareText = `Check out my AI Agent Corruption Chronicle: ${getMissionName(creation.missionId)} corrupted by ${getAttackDetails(creation.attackIds).map(a => a.name).join(', ')}!`;
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
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p className="loading-text">Loading creation...</p>
      </div>
    );
  }
  
  // Show not found state
  if (!creation) {
    return (
      <div className="not-found-container">
        <h1 className="not-found-title">Creation Not Found</h1>
        <p className="not-found-description">
          The creation you're looking for doesn't exist or has been deleted.
        </p>
        <Link href="/gallery" className="back-link">
          <FaArrowLeft className="back-icon" />
          <span>Back to Gallery</span>
        </Link>
      </div>
    );
  }
  
  // Get the selected mission and attacks
  const missionName = getMissionName(creation.missionId);
  const selectedAttacks = getAttackDetails(creation.attackIds);
  
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
          
          <div className="narrative-section outcome-section">
            <h4 className="section-title">OUTCOME</h4>
            <p>{outcomeMatch[1].trim()}</p>
          </div>
        </>
      );
    }
    
    // Otherwise, just return the whole narrative
    return <p>{narrative}</p>;
  };
  
  return (
    <motion.div 
      className="result-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="page-header">
        <Link href="/gallery" className="back-link">
          <FaArrowLeft className="back-icon" />
          <span>Back to Gallery</span>
        </Link>
        <h1 className="page-title">Corruption Chronicle</h1>
      </div>
      
      <motion.div 
        className="result-container"
        variants={itemVariants}
      >
        <div className="result-header">
          <h2 className="result-title">{missionName}</h2>
          <div className="attack-tags">
            {selectedAttacks.map(attack => (
              <span 
                key={attack.id} 
                className="attack-tag"
                style={{ backgroundColor: `${attack.color}30`, color: attack.color }}
              >
                {attack.name}
              </span>
            ))}
          </div>
        </div>
        
        <div className="result-content">
          <div className="result-image-container">
            <img 
              src={creation.imageUrl} 
              alt="Generated corruption scene" 
              className="result-image"
            />
          </div>
          
          <div className="result-narrative">
            {formatNarrative(creation.narrative)}
          </div>
        </div>
        
        <div className="share-container">
          <h3 className="share-title">
            <FaShare className="share-icon" />
            Share This Creation
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
        </div>
        
        <div className="action-buttons">
          <Link href="/create" className="action-button">
            <span>Create Another</span>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
