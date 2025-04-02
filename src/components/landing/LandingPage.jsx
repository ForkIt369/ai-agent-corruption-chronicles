import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import styles from './LandingPage.module.css';

/**
 * Landing page component with dual-option interface (Alith vs cAlith)
 * Allows users to choose between viewing real-life corruption stories or creating their own
 */
export default function LandingPage() {
  const router = useRouter();
  const [orbPosition, setOrbPosition] = useState('center'); // 'left', 'center', or 'right'
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle option selection
  const handleOptionSelect = (option) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Set orb position based on selected option
    setOrbPosition(option);
    
    // Navigate to the appropriate page after animation completes
    setTimeout(() => {
      if (option === 'left') {
        router.push('/gallery');
      } else if (option === 'right') {
        router.push('/create');
      }
    }, 1000); // Match this with the animation duration
  };

  return (
    <div className={styles.landingContainer}>
      <motion.div 
        className={styles.titleContainer}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className={styles.title}>AI Agent Corruption Chronicles</h1>
        <p className={styles.subtitle}>Explore the mischievous world of corrupted AI agents</p>
      </motion.div>
      
      <div className={styles.optionsContainer}>
        {/* Left Option - Alith (Real-life corruption stories) */}
        <motion.div 
          className={`${styles.option} ${styles.leftOption} ${orbPosition === 'left' ? styles.active : ''}`}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={() => handleOptionSelect('left')}
          whileHover={{ scale: 1.05 }}
        >
          <div className={styles.optionContent}>
            <h2 className={styles.optionTitle}>Real-Life Corruption Stories</h2>
            <p className={styles.optionDescription}>
              Explore Calith's gallery of real-world AI and crypto corruption incidents
            </p>
            <div className={styles.characterContainer}>
              <div className={styles.characterAlith}>
                <div className={styles.characterGlow}></div>
              </div>
            </div>
            <motion.button 
              className={styles.optionButton}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              View Gallery
            </motion.button>
          </div>
        </motion.div>
        
        {/* Orb (animated between options) */}
        <motion.div 
          className={styles.orb}
          animate={{ 
            x: orbPosition === 'left' ? '-150%' : 
               orbPosition === 'right' ? '150%' : '0%',
            backgroundColor: orbPosition === 'left' ? '#00A6ED' : 
                            orbPosition === 'right' ? '#FF5A8C' : '#8A2BE2'
          }}
          transition={{ duration: 0.8, type: 'spring' }}
        />
        
        {/* Right Option - cAlith (Create your corruption chronicle) */}
        <motion.div 
          className={`${styles.option} ${styles.rightOption} ${orbPosition === 'right' ? styles.active : ''}`}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={() => handleOptionSelect('right')}
          whileHover={{ scale: 1.05 }}
        >
          <div className={styles.optionContent}>
            <h2 className={styles.optionTitle}>Create Your Corruption Chronicle</h2>
            <p className={styles.optionDescription}>
              Generate your own AI agent corruption story and image
            </p>
            <div className={styles.characterContainer}>
              <div className={styles.characterCAlith}>
                <div className={styles.characterGlow}></div>
              </div>
            </div>
            <motion.button 
              className={styles.optionButton}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Creating
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className={styles.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <p>Choose your path in the world of AI corruption</p>
      </motion.div>
    </div>
  );
}
