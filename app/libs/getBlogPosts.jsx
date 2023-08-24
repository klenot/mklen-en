export default async function getBlogPosts() {
  const { Client } = require("@notionhq/client");
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const response = await notion.databases.query({
    database_id: process.env.BLOG_DATABASE_ID,
    filter: {
      property: "Publish",
      select: {
        equals: "Published",
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
