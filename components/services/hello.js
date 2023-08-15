const { Client } = require("@notionhq/client");

  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  
  const response = await notion.databases.query({
    database_id: process.env.SERVICES_DATABASE_ID,
    filter: {
      or: [
        {
        property: "Publish",
        contains: "Publshed"
        }
      ],
    }
  });
  
  console.log(response)