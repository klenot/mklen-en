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
      BLOG_DATABASE_ID: process.env.BLOG_DATABASE_ID,
      SERVICES_DATABASE_ID: process.env.SERVICES_DATABASE_ID,
      PROJECTS_DATABASE_ID: process.env.PROJECTS_DATABASE_ID,
      BOOKS_DATABASE_ID: process.env.BOOKS_DATABASE_ID,
    },

  };

module.exports = nextConfig
