import Head from 'next/head';
import LandingPage from '../components/landing/LandingPage';

export default function Home() {
  return (
    <>
      <Head>
        <title>AI Agent Corruption Chronicles</title>
        <meta name="description" content="Explore the mischievous world of corrupted AI agents through real-life stories or create your own corruption chronicle." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LandingPage />
    </>
  );
}
