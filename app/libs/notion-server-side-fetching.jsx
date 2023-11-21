"use server"

import { Client } from "@notionhq/client";
import { cache } from "react";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const getPageBySlug = cache((slug, databaseId) => {
  return notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    })
});

export async function getPage(pageId) {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response
}

export async function getBlocks(pageId) {
  pageId = pageId.replaceAll("-", "");

  const { results } = await notion.blocks.children.list({
    block_id: pageId,
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

export async function GenerateKey(){
  const generatedKey = Math.random().toString(36).slice(2, 7);
  return generatedKey
}