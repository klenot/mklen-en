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
    COOP_DATABASE_ID: process.env.COOP_DATABASE_ID,
  },
};

module.exports = nextConfig;
