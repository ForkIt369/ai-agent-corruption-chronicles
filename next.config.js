/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['gateway.fal.ai'], // Allow images from Fal.ai
  },
  async headers() {
    return [
      {
        // More restrictive security headers for production
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://corruptchronicles.com', // Restricted to your domain
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,POST',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://corruptchronicles.com", // Restricted to your domain
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // More secure setting
          },
        ],
      },
    ];
  },
  // Environment variables that should be available to the browser
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
};

module.exports = nextConfig;
