import { WizardProvider } from '../context/WizardContext';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }) {
  // Check if the page is meant to be embedded
  const isEmbedded = router.pathname === '/embed';
  
  return (
    <WizardProvider>
      <Layout isEmbedded={isEmbedded}>
        <Component {...pageProps} />
      </Layout>
    </WizardProvider>
  );
}

export default MyApp;
