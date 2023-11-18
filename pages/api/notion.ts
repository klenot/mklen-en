// notion.js with CORS implementation
import { Client } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from 'next';
import initMiddleware from "../api/init-middleware.js";
import Cors from "cors"

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const corsMiddleware = initMiddleware(
  // You can adjust the CORS options based on your requirements
  Cors({
    origin: '*',
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
  })
);

const addCorsHeaders = (handler) => async (req, res) => {
  try {
    // Use the CORS middleware
    await corsMiddleware(req, res);
    // Explicitly set the CORS header
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    // Log the CORS headers
    console.log('CORS headers:', res.getHeaders());
  } catch (error) {
    console.error('CORS middleware error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }

  // Call the original handler function
  await handler(req, res);
};

export default addCorsHeaders(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  console.log('Request body:', req.body);

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
      console.log("Executing databaseQueryWithOr operation");
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
      console.log("Executing databaseQueryWithAnd operation");
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
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access. Please check your Notion API key.");
      console.log("Request body:", req.body);
      console.log("Response data:", error.response.data);
      console.log("Response headers:", error.response.headers);
      res.status(401).json({ error: "Unauthorized access." });
    } else if (error.response && error.response.status === 429) {
      const retryAfter = error.response.headers['retry-after'];
      console.warn(`Rate limited. Retry after ${retryAfter} seconds.`);
      res.status(429).json({ error: `Rate limited. Retry after ${retryAfter} seconds.` });
    } else {
      console.error("Error with Notion operation:", error);
      res.status(500).json({ error: req.body });
    }
  }
});







/* // notion.js with CORS implementation
import { Client } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import initMiddleware from "../api/init-middleware.js";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const corsMiddleware = initMiddleware(
  Cors({
    origin: '*',
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
  })
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // Use the CORS middleware
  try {
    await corsMiddleware(req, res);
    // Explicitly set the CORS header
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Log the CORS headers
    console.log('CORS headers:', res.getHeaders());
  } catch (error) {
    console.error('CORS middleware error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }

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
      console.log("Executing databaseQueryWithOr operation");
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
      }
      );
      res.status(200).json(response.results);
    } else if (operation === "databaseQueryWithAnd") {
      console.log("Executing databaseQueryWithAnd operation");
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
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access. Please check your Notion API key.");
      console.log("Request body:", req.body);
      console.log("Response data:", error.response.data);
      console.log("Response headers:", error.response.headers);
      res.status(401).json({ error: "Unauthorized access." });
    } else if (error.response && error.response.status === 429) {
      const retryAfter = error.response.headers['retry-after'];
      console.warn(`Rate limited. Retry after ${retryAfter} seconds.`);
      res.status(429).json({ error: `Rate limited. Retry after ${retryAfter} seconds.` });
    } else {
      console.error("Error with Notion operation:", error);
      res.status(500).json({ error: req.body });
    }
  }
} */