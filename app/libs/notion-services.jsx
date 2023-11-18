import axios from "axios";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function getDatabaseWithOr(databaseId, filterA, categoryA, filterB, categoryB) {  
  let baseUrl = '';

  // Check if the code is running on the client or server side
  if (typeof window !== 'undefined') {
    // Client-side logic to get the base URL
    baseUrl = window.location.origin;
  } else {
    // Server-side logic to get the base URL
    // You might need to customize this based on your server setup
    baseUrl = process.env.VERCEL_URL
      ? `https://www.${process.env.VERCEL_URL}`
      : 'http://localhost:3000';
  }

  console.log("Base URL for 'getDatabaseWithOr':", baseUrl);

  try {
    console.log("Axios Request:", {
      url: `${baseUrl}/api/notion`,
      method: 'post',
      operation: "databaseQueryWithOr",
      data: { databaseId, filterA, categoryA, filterB, categoryB },
    });
    const response = await axios.post(`${baseUrl}/api/notion`, { /* http://localhost:3000/api/notion */
      operation: "databaseQueryWithOr",
      data: { databaseId, filterA, categoryA, filterB, categoryB },
    });
    return response.data
  } catch (error) {

    if((error.response && error.response.status === 401)) {
      console.error("Error fetching database from Notion API - Authorization:", error);
      console.log("Full Axios Error:", error.response || error.request || error.message);
    }
    else {
    console.error("Error fetching database from Notion API:", error);
    console.log("Full Axios Error:", error.response || error.request || error.message);
    throw error;
    }
  }
}

export async function getDatabaseWithAnd(databaseId, filterA, categoryA, filterB, categoryB) {
  let baseUrl = '';

  // Check if the code is running on the client or server side
  if (typeof window !== 'undefined') {
    // Client-side logic to get the base URL
    baseUrl = window.location.origin;
  } else {
    // Server-side logic to get the base URL
    // You might need to customize this based on your server setup
    baseUrl = process.env.VERCEL_URL
      ? `https://www.${process.env.VERCEL_URL}`
      : 'http://localhost:3000';
  }

  console.log("Base URL for 'getDatabaseWithAnd':", baseUrl);

  try {
    console.log("Axios Request:", {
      url: `${baseUrl}/api/notion`,
      method: 'post',
      operation: "databaseQueryWithAnd",
      data: { databaseId, filterA, categoryA, filterB, categoryB },
    });
    const response = await axios.post(`${baseUrl}/api/notion`, { /* "http://localhost:3000/api/notion" */ /* `${baseUrl}/api/notion` */
      operation: "databaseQueryWithAnd",
      data: { databaseId, filterA, categoryA, filterB, categoryB },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching database from Notion API:", error);
    console.log("Full Axios Error:", error.response || error.request || error.message);
    throw error;
  }  
}

export async function getPage(pageId) {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response
}

export async function getBlocks(blockId) {
  blockId = blockId.replaceAll("-", "");

  const { results } = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 150,
  });
  /* return results */

  const childBlocks = results.map(async (block) => {
    if (block.has_children) {
      const children = await getBlocks(block.id);
      return { ...block, children };
    }
    return block;
  });
  
  return await Promise.all(childBlocks).then((blocks) => {
    return blocks.reduce((acc, curr) => {
      if (curr.type === "bulleted_list_item") {
        if (acc[acc.length - 1]?.type === "bulleted_list") {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: "bulleted_list",
            bulleted_list: { children: [curr] },
          });
        }
      } else if (curr.type === "numbered_list_item") {
        if (acc[acc.length - 1]?.type === "numbered_list") {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: "numbered_list",
            numbered_list: { children: [curr] },
          });
        }
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function GenerateKey(){
  const generatedKey = Math.random().toString(36).slice(2, 7);
  return generatedKey
}
