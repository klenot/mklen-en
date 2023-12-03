import { Client } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /* console.log("Request body:", req.body); */
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // Check the request method
  if (req.method === "OPTIONS") {
    // Respond to preflight request
    res.status(200).end();
    return;
  }

  try {
    // Determine the type of Notion operation based on the request body
    const { operation, data } = req.body;
    /* console.log("🚀 ~ file: notion.ts:25 ~ operation, data:", operation, data); */

    if (operation === "databaseQueryWithOr") {
      /* console.log("Executing databaseQueryWithOr operation"); */
      const response = await notion.databases.query({
        database_id: data.databaseId,
        filter: {
          or: [
            {
              property: data.filterA,
              select: {
                equals: data.categoryA,
              },
            },
            {
              property: data.filterB,
              select: {
                equals: data.categoryB,
              },
            },
          ],
        },
      });
      res.status(200).json(response.results);
      return;
    } else if (operation === "databaseQueryWithAnd") {
      /* console.log("Executing databaseQueryWithAnd operation"); */
      const response = await notion.databases.query({
        database_id: data.databaseId,
        filter: {
          and: [
            {
              property: data.filterA,
              select: {
                equals: data.categoryA,
              },
            },
            {
              property: data.filterB,
              select: {
                equals: data.categoryB,
              },
            },
          ],
        },
      });
      res.status(200).json(response.results);
      return;
    } else if (operation === "retrievePage") {
      const response = await notion.pages.retrieve({ page_id: data.pageId });
      res.status(200).json(response);
    } else if (operation === "listBlocks") {
      const { results } = await notion.blocks.children.list({
        block_id: data.blockId,
        page_size: 150,
      });
      res.status(200).json(results);
      return;
    }
    if (operation === "getPage") {
      const response = await notion.pages.retrieve({ page_id: data.pageId });
      res.status(200).json(response);
      return;
    } else if (operation === "getBlocks") {
      const { results } = await notion.blocks.children.list({
        block_id: data.blockId,
        page_size: 150,
      });
      return;
    } else {
      res.status(400).json({ error: "Invalid operation" });
      return;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access. Please check your Notion API key.");
      console.log("Request body:", req.body);
      console.log("Response data:", error.response.data);
      console.log("Response headers:", error.response.headers);
      res.status(401).json({ error: "Unauthorized access." });
    } else if (error.response && error.response.status === 429) {
      const retryAfter = error.response.headers["retry-after"];
      console.warn(`Rate limited. Retry after ${retryAfter} seconds.`);
      res
        .status(429)
        .json({ error: `Rate limited. Retry after ${retryAfter} seconds.` });
      return;
    } else {
      console.error("Error with Notion operation:", error);
      res.status(500).json({ error: req.body });
      return;
    }
  }
}
