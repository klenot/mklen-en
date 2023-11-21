import axios from "axios";

// Use an environment variable for the base URL to handle different environments
const baseURL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
  : "/api";

export const notion = axios.create({
  baseURL, // '/api'
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

export const getDatabaseWithOr = async (databaseId, filterA, categoryA, filterB, categoryB) => {
  console.warn("🚀 ~ file: notion-client-side-fetching ~ getDatabaseWithOr ~ databaseId, filterA, categoryA, filterB, categoryB:", databaseId, filterA, categoryA, filterB, categoryB);
  try {
    const response = await notion.post("/notion", {
      operation: "databaseQueryWithOr",
      data: { databaseId, filterA, categoryA, filterB, categoryB },
    });
    console.log("🚀 ~ file: notion-client-side-fetching ~ getDatabaseWithOr ~ response:", response);
    return response.data;
  } catch (error) {
    handleNotionError(error);
  }
};

export const getDatabaseWithAnd = async (databaseId, filterA, categoryA, filterB, categoryB) => {
  try {
    const response = await notion.post("/notion", {
      operation: "databaseQueryWithAnd",
      data: { databaseId, filterA, categoryA, filterB, categoryB },
    });
    console.log("🚀 ~ file: notion-services.jsx:35 ~ getDatabaseWithAnd ~ response:", response);
    return response.data;
  } catch (error) {
    handleNotionError(error);
  }
};

export const getPage = async (pageId) => {
  try {
    const response = await notion.post("/notion", {
      operation: "getPage",
      data: { pageId },
    });
    return response.data;
  } catch (error) {
    handleNotionError(error);
  }
};

// Use this function to update blockId with a standardized format
const formatBlockId = (blockId) => blockId.replaceAll("-", "");

export const getBlocks = async (blockId) => {
  try {
    const formattedBlockId = formatBlockId(blockId);
    const response = await notion.post("/notion", {
      operation: "getBlocks",
      data: { blockId: formattedBlockId },
    });
    return response.data;
  } catch (error) {
    handleNotionError(error);
  }
};

export const GenerateKey = () => {
  const generatedKey = Math.random().toString(36).slice(2, 7);
  return generatedKey;
};

// Add this function to handle Notion API errors
function handleNotionError(error) {
  if (error.response && error.response.status === 401) {
    console.error("Unauthorized access. Please check your Notion API key.");
    // Handle unauthorized error
  } else if (error.response && error.response.status === 429) {
    const retryAfter = error.response.headers["retry-after"] || "unknown";
    console.warn(`Rate limited. Retry after ${retryAfter} seconds.`);
    // Handle rate limit error
  } else {
    console.error("Error with Notion API:", error);
    // Handle other errors
  }
}
