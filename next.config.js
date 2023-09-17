/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },

    env: {
      SKILLS_DATABASE_ID: process.env.SKILLS_DATABASE_ID,
    },

  };

module.exports = nextConfig
