const nextConfig = {
  /* images: {
    domains: ['example.s3.us-west-2.amazonaws.com'],
  }, */
  images: {
    unoptimized: false,
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
    CV_DATABASE_ID: process.env.CV_DATABASE_ID,
    GTM_ID: process.env.GTM_ID,
  },

  redirects: async () => {
    return [
      {
        source: "/services/guidelines",
        destination: "/cooperation",
        permanent: true,
      },
      {
        source: "/about/skills",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/about/projects",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/services/project-management",
        destination: "/services/project-management-consultation",
        permanent: false,
      }
    ]
  }

};

module.exports = nextConfig;
