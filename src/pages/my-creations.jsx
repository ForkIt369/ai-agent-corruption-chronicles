import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft, FaEye } from 'react-icons/fa';
import { getCreations } from '../utils/sessionManager';
import missions from '../data/missions';
import attacks from '../data/attacks';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};

export default function MyCreationsPage() {
  const [creations, setCreations] = useState([]);
  
  // Load creations from localStorage on mount
  useEffect(() => {
    const loadedCreations = getCreations();
    setCreations(loadedCreations);
  }, []);
  
  // Format the date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get mission and attack names for a creation
  const getMissionName = (missionId) => {
    const mission = missions.find(m => m.id === missionId);
    return mission ? mission.name : 'Unknown Mission';
  };
  
  const getAttackNames = (attackIds) => {
    return attackIds.map(id => {
      const attack = attacks[id];
      return attack ? attack.name : 'Unknown Attack';
    }).join(', ');
  };
  
  return (
    <>
      <Head>
        <title>My Creations | AI Agent Corruption Chronicles</title>
        <meta name="description" content="View your previously created AI agent corruption narratives and images." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <motion.div 
        className="my-creations-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="page-header">
          <h1 className="page-title">Your Corruption Chronicles</h1>
          <p className="page-description">
            View your previously created AI agent corruption narratives and images.
          </p>
          <Link href="/" className="back-link">
            <FaArrowLeft className="back-icon" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        {creations.length === 0 ? (
          <div className="empty-gallery">
            <h2 className="empty-title">No Creations Yet</h2>
            <p className="empty-description">
              You haven't created any corruption chronicles yet. 
              Start creating to see them here!
            </p>
            <Link href="/create" className="cta-button">
              <span>Create Your First Chronicle</span>
            </Link>
          </div>
        ) : (
          <motion.div 
            className="gallery-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {creations.map((creation) => (
              <motion.div 
                key={creation.id}
                className="gallery-item"
                variants={itemVariants}
              >
                <div className="gallery-image-container">
                  <img 
                    src={creation.imageUrl} 
                    alt="Corruption chronicle" 
                    className="gallery-image"
                  />
                  <Link href={`/results/${creation.id}`} className="view-button">
                    <FaEye className="view-icon" />
                    <span>View</span>
                  </Link>
                </div>
                <div className="gallery-content">
                  <h3 className="gallery-title">
                    {getMissionName(creation.missionId)}
                  </h3>
                  <p className="gallery-subtitle">
                    {getAttackNames(creation.attackIds)}
                  </p>
                  <p className="gallery-date">
                    {creation.timestamp ? formatDate(creation.timestamp) : 'Unknown date'}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
