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
      NOTION_API_KEY: process.env.NOTION_API_KEY,
      SKILLS_DATABASE_ID: process.env.SKILLS_DATABASE_ID,
      BLOG_DATABASE_ID: process.env.BLOG_DATABASE_ID,
      SERVICES_DATABASE_ID: process.env.SERVICES_DATABASE_ID,
      PROJECTS_DATABASE_ID: process.env.PROJECTS_DATABASE_ID,
      BOOKS_DATABASE_ID: process.env.BOOKS_DATABASE_ID,
      NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL,
    },

  };

module.exports = nextConfig
