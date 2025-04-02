import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { WizardProvider } from '../context/WizardContext';
import WizardContainer from '../components/wizard/WizardContainer';

// Function to initialize communication with the parent window
const initEmbedCommunication = () => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return;
  
  // Check if we're in an iframe
  const isInIframe = window.self !== window.top;
  if (!isInIframe) return;
  
  // Listen for messages from parent window
  window.addEventListener('message', (event) => {
    // Verify origin for security (in production, this should be restricted to your Webflow domain)
    // if (event.origin !== 'https://your-webflow-site.com') return;
    
    const { type, data } = event.data;
    
    switch (type) {
      case 'THEME_CHANGE':
        // Update app theme based on parent site
        document.documentElement.setAttribute('data-theme', data.theme);
        break;
      // Other message types as needed
    }
  });
  
  // Notify parent when app is ready
  window.parent.postMessage({ type: 'APP_READY' }, '*');
  
  // Request initial height adjustment
  const adjustHeight = () => {
    const height = document.body.scrollHeight;
    window.parent.postMessage({ 
      type: 'RESIZE_REQUEST', 
      data: { height } 
    }, '*');
  };
  
  // Adjust height on load and resize
  window.addEventListener('load', adjustHeight);
  window.addEventListener('resize', adjustHeight);
  
  // Periodically check for height changes (for dynamic content)
  setInterval(adjustHeight, 500);
};

export default function EmbedPage() {
  const router = useRouter();
  
  // Get any query parameters passed from Webflow
  const { theme, initialStep } = router.query;
  
  // Initialize communication with parent window
  useEffect(() => {
    initEmbedCommunication();
    
    // Apply theme if provided
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);
  
  return (
    <div className="embed-container">
      <WizardProvider>
        <WizardContainer isEmbedded={true} />
      </WizardProvider>
    </div>
  );
}

// Add special meta tags for embedding
EmbedPage.getInitialProps = async () => {
  return {
    // These will be added to the <head> of the page
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1'
      },
      {
        name: 'robots',
        content: 'noindex'
      }
    ]
  };
};
