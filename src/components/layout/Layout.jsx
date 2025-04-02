import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { getOrCreateSessionId } from '../../utils/sessionManager';

export default function Layout({ children, isEmbedded = false }) {
  // Initialize session on mount
  useEffect(() => {
    getOrCreateSessionId();
  }, []);

  // If embedded, use a simplified layout
  if (isEmbedded) {
    return (
      <div className="embed-container">
        {children}
      </div>
    );
  }

  return (
    <div className="layout">
      <Header />
      <motion.main 
        className="main-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
