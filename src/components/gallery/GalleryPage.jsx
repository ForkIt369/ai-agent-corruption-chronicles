import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { realIncidents } from '../../data/realIncidents';
import styles from './GalleryPage.module.css';

/**
 * Gallery page component to display real-life corruption incidents
 * Shows a grid of incidents with filtering and detail view
 */
export default function GalleryPage() {
  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Initialize incidents on component mount
  useEffect(() => {
    setIncidents(realIncidents);
    setFilteredIncidents(realIncidents);
  }, []);

  // Filter incidents based on attack type and search term
  useEffect(() => {
    let result = [...incidents];
    
    // Filter by attack type
    if (filter !== 'all') {
      result = result.filter(incident => 
        incident.attackType.toLowerCase().includes(filter.toLowerCase())
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(incident => 
        incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.story.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredIncidents(result);
  }, [filter, searchTerm, incidents]);

  // Get unique attack types for filter options
  const attackTypes = [...new Set(incidents.map(incident => incident.attackType))];

  // Handle incident click to show detail view
  const handleIncidentClick = (incident) => {
    setSelectedIncident(incident);
    setIsModalOpen(true);
  };

  // Close the detail modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Generate a unique image for an incident using Fal.ai
  const generateIncidentImage = async (incident) => {
    if (!incident.imagePrompt) {
      console.error('No image prompt available for incident:', incident.title);
      return;
    }

    // Show generating indicator
    setIsGenerating(true);

    try {
      const { generateImage } = await import('../../api/fal');
      const result = await generateImage(incident.imagePrompt);
      
      if (result.success && result.imageUrl) {
        // Create a new image element to replace the current one
        const imageElement = document.querySelector(`.${styles.modalGalleryImage}`);
        if (imageElement) {
          // Save the original image URL in case we need to revert
          const originalSrc = imageElement.src;
          
          // Update the image source
          imageElement.src = result.imageUrl;
          
          // Handle loading error (revert to original if it fails)
          imageElement.onerror = () => {
            console.error('Failed to load generated image');
            imageElement.src = originalSrc;
          };
          
          // Show the image and hide the placeholder
          imageElement.style.display = 'block';
          const placeholder = document.querySelector(`.${styles.modalPlaceholderImage}`);
          if (placeholder) {
            placeholder.style.display = 'none';
          }
        }
      } else {
        console.error('Image generation failed:', result.error);
      }
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={styles.galleryContainer}>
      <motion.div 
        className={styles.galleryHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.galleryTitle}>Calith's Gallery of Real-Life AI Chaos</h1>
        <p className={styles.galleryDescription}>
          A visual collection of hilarious yet cautionary real-world incidents, 
          playfully credited to Calith, the corrupted AI.
        </p>
        
        <div className={styles.filterContainer}>
          <div className={styles.searchBox}>
            <input 
              type="text" 
              placeholder="Search incidents..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.filterOptions}>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Attack Types</option>
              {attackTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>
      
      <div className={styles.galleryGrid}>
        {filteredIncidents.map((incident, index) => (
          <motion.div 
            key={incident.id}
            className={styles.incidentCard}
            onClick={() => handleIncidentClick(incident)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className={styles.incidentImageContainer}>
              <div className={styles.incidentImage}>
                {/* Try to load the image, fallback to placeholder on error */}
                <img 
                  src={`https://corruptchronicles.com/gallery-images/${incident.id}.jpg`} 
                  alt={incident.title}
                  className={styles.galleryImage}
                  onError={(e) => {
                    // Hide the image and show the placeholder on error
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className={styles.placeholderImage} 
                  style={{ 
                    backgroundColor: `hsl(${index * 20}, 70%, 60%)`,
                    display: 'none' // Hidden by default
                  }}
                >
                  <span>{incident.title.charAt(0)}</span>
                </div>
              </div>
              <div className={styles.incidentYear}>{incident.year}</div>
              <div className={styles.attackType}>{incident.attackType}</div>
            </div>
            <div className={styles.incidentContent}>
              <h3 className={styles.incidentTitle}>{incident.title}</h3>
              <p className={styles.incidentSummary}>{incident.summary}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredIncidents.length === 0 && (
        <div className={styles.noResults}>
          <p>No incidents found matching your criteria.</p>
          <button 
            className={styles.resetButton}
            onClick={() => {
              setFilter('all');
              setSearchTerm('');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
      
      {/* Incident Detail Modal */}
      {isModalOpen && selectedIncident && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <motion.div 
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button className={styles.closeButton} onClick={closeModal}>×</button>
            
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{selectedIncident.title}</h2>
              <div className={styles.modalMeta}>
                <span className={styles.modalYear}>{selectedIncident.year}</span>
                <span className={styles.modalAttack}>{selectedIncident.attackType}</span>
              </div>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.modalImageContainer}>
                <div className={styles.modalImage}>
                  {/* Try to load the image, fallback to placeholder on error */}
                  <img 
                    src={`https://corruptchronicles.com/gallery-images/${selectedIncident.id}.jpg`} 
                    alt={selectedIncident.title}
                    className={styles.modalGalleryImage}
                    onError={(e) => {
                      // Hide the image and show the placeholder on error
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    className={styles.modalPlaceholderImage}
                    style={{ display: 'none' }} // Hidden by default
                  >
                    <span>{selectedIncident.title.charAt(0)}</span>
                  </div>
                </div>
                <button 
                  className={styles.generateImageButton}
                  onClick={() => generateIncidentImage(selectedIncident)}
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Generate New Image'}
                </button>
              </div>
              
              <div className={styles.modalDetails}>
                <div className={styles.modalSection}>
                  <h3 className={styles.modalSectionTitle}>Summary</h3>
                  <p>{selectedIncident.summary}</p>
                </div>
                
                <div className={styles.modalSection}>
                  <h3 className={styles.modalSectionTitle}>Calith's Corruption Attack</h3>
                  <p className={styles.attackName}>{selectedIncident.attackType}</p>
                </div>
                
                <div className={styles.modalSection}>
                  <h3 className={styles.modalSectionTitle}>Detailed Story</h3>
                  <p>{selectedIncident.story}</p>
                </div>
                
                <div className={styles.modalSection}>
                  <h3 className={styles.modalSectionTitle}>Real-Life Consequences</h3>
                  <ul className={styles.consequencesList}>
                    {selectedIncident.consequences.map((consequence, index) => (
                      <li key={index}>{consequence}</li>
                    ))}
                  </ul>
                </div>
                
                <div className={styles.modalSection}>
                  <h3 className={styles.modalSectionTitle}>Sources</h3>
                  <ul className={styles.sourcesList}>
                    {selectedIncident.sources.map((source, index) => (
                      <li key={index}>
                        <a href={source.url} target="_blank" rel="noopener noreferrer">
                          {source.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      <div className={styles.galleryFooter}>
        <Link href="/" className={styles.backButton}>
          Return to Home
        </Link>
      </div>
    </div>
  );
}
