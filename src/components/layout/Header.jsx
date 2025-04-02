import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaRobot, FaHistory, FaBookOpen, FaPlusCircle } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <motion.div 
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="logo-link">
            <FaRobot className="logo-icon" />
            <span className="logo-text">AI Agent Corruption Chronicles</span>
          </Link>
        </motion.div>
        
        <motion.nav 
          className="nav"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/create" className="nav-link">
            <FaPlusCircle className="nav-icon" />
            <span>Create</span>
          </Link>
          <Link href="/gallery" className="nav-link">
            <FaBookOpen className="nav-icon" />
            <span>Real Stories</span>
          </Link>
          <Link href="/my-creations" className="nav-link">
            <FaHistory className="nav-icon" />
            <span>My Creations</span>
          </Link>
        </motion.nav>
      </div>
    </header>
  );
}
