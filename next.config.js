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
      SERVICES_DATABASE_ID: process.env.SERVICES_DATABASE_ID,
      PROJECTS_DATABASE_ID: process.env.PROJECTS_DATABASE_ID,
      BLOG_DATABASE_ID: process.env.BLOG_DATABASE_ID,
      SKILLS_DATABASE_ID: process.env.SKILLS_DATABASE_ID,
      BOOKS_DATABASE_ID: process.env.BOOKS_DATABASE_ID,
    },

    async headers() {
      return [
        {
          source: "/api/:path*",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "*" },
            { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
            { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
          ]
        }
      ]
    }

  };

module.exports = nextConfig
