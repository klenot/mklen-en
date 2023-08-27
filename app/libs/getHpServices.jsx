export default async function getHomepageServices() {
  const { Client } = require("@notionhq/client");
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const response = await notion.databases.query({
    database_id: process.env.SERVICES_DATABASE_ID,
    filter: {
      property: "Publish",
      select: {
        equals: "Published",
      },
      property: "Placement",
      select: {
        equals: "Homepage",
      },
    },
  });

  const services = response.results;
  return services;
}
