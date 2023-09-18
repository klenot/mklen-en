import "server-only";

import { Client } from "@notionhq/client";
import {
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const getBlogBySlug = cache((slug: string) => {
  return notion.databases.query({
      database_id: process.env.BLOG_DATABASE_ID,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => res.results[0] as PageObjectResponse | undefined);
});

export const getServiceBySlug = cache((slug: string) => {
  return notion.databases
    .query({
      database_id: process.env.SERVICES_DATABASE_ID,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => res.results[0] as PageObjectResponse | undefined);
});