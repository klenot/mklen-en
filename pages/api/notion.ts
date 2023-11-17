// notion.js with CORS implementation
import { Client } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return `${process.env.NEXT_PUBLIC_LOCAL_URL}`
  }
  return `https://${process.env.VERCEL_URL || "example.com"}`
}
const baseUrl = getBaseUrl()
console.log(baseUrl)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers dynamically based on the origin of the incoming request
  const origin = req.headers.origin;
  const allowedOrigins = [getBaseUrl()]; // Add other allowed origins if needed

  if (allowedOrigins.includes(origin!)) {
    res.setHeader("Access-Control-Allow-Origin", origin!);
  }

  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Check the request method
  if (req.method === "OPTIONS") {
    // Respond to preflight request
    res.status(200).end();
    return;
  }

  try {
    // Determine the type of Notion operation based on the request body
    const { operation, data } = req.body;

    if (operation === "databaseQueryWithOr") {
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
    } else if (operation === "databaseQueryWithAnd") {
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



/* // notion.js // without CORS implementation
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

    if (operation === "databaseQueryWithOr") {
      const response = await notion.databases.query({
        database_id: data.databaseId,
        filter:{
          or: [
            {
              property: data.filterA,
              select: {
              equals: data.categoryA
              }
            },
            {
              property: data.filterB,
              select: {
              equals: data.categoryB
              }
            },
          ]
        }
      });
      res.status(200).json(response.results);
    } else if (operation === "databaseQueryWithAnd") {
        const response = await notion.databases.query({
          database_id: data.databaseId,
          filter:{
            and: [
              {
                property: data.filterA,
                select: {
                equals: data.categoryA
                }
              },
              {
                property: data.filterB,
                select: {
                equals: data.categoryB
                }
              },
            ]
          }
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
 */