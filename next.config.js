/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for static export (GitHub Pages)
  output: "export", // 👈 Enables static HTML export
  basePath: process.env.NODE_ENV === "production" ? "/AIQAgents" : "", // 👈 Replace "AIQAgents" with your repo name
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Required for `next export` with images
    unoptimized: true, // 👈 Disables Image Optimization (GitHub Pages doesn't support it)
  },
  // Optional: Add trailingSlash for GitHub Pages compatibility
  trailingSlash: true,
};

module.exports = nextConfig;