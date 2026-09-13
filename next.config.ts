import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Prism loads language grammars with dynamic Node.js requires at build time.
  serverExternalPackages: ['prismjs'],
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
