// notion.js
import { Client } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Determine the type of Notion operation based on the request body
    const { operation, data } = req.body;

    if (operation === "databaseQuery") {
      const response = await notion.databases.query({
        database_id: data.databaseId,
        filter: {
          property: data.filter,
          select: {
            equals: data.category,
            },
          },
      });
      res.status(200).json(response.results);
    } else if (operation === "retrievePage") {
      const response = await notion.pages.retrieve({ page_id: data.pageId });
      res.status(200).json(response);
    } else if (operation === "listBlocks") {
      const { results } = await notion.blocks.children.list({
        block_id: data.blockId,
        page_size: 150,
      });
      res.status(200).json(results);
    } else {
      res.status(400).json({ error: "Invalid operation" });
    }
  } catch (error) {
    console.error("Error with Notion operation:", error);
    res.status(500).json({ error: req.body });
  }
}
