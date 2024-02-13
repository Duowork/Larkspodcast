/** @type {import('next').NextConfig} */
const path = require("path");

const { parsed: localEnv } = require("dotenv").config({
  path: path.resolve(__dirname, `.env.local`),
});

const nextConfig = {
  reactStrictMode: true,
  // Set up environment variables
  env: localEnv,
  // Set up image optimization
  images: {
    domains: ["d3t3ozftmdmh3i.cloudfront.net"],
    unoptimized: true,
    
  },
  // SASS
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
  // Bypass CORS
  async rewrites() {
    return [
      {
        source: "/api/subscriber",
        destination: "https://api.mailjet.com/v3/REST/contact",
      },
    ];
  },
};

module.exports = nextConfig;
