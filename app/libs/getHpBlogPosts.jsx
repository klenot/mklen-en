export default async function getHomepageBlogPosts() {
  const { Client } = require("@notionhq/client");
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const response = await notion.databases.query({
    database_id: process.env.BLOG_DATABASE_ID,
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
    sorts: [
      {
        property: "PostDate",
        direction: "descending",
      },
    ],
  });

  const blogs = response.results;
  return blogs;
}
