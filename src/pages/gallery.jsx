import Head from 'next/head';
import GalleryPage from '../components/gallery/GalleryPage';

export default function Gallery() {
  return (
    <>
      <Head>
        <title>Real-Life Corruption Stories | AI Agent Corruption Chronicles</title>
        <meta name="description" content="Explore Calith's gallery of real-world AI and crypto corruption incidents - a visual collection of hilarious yet cautionary real-world incidents." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GalleryPage />
    </>
  );
}
