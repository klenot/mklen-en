import axios from "axios";

// export const getDatabase = async (databaseId) => {
//   const response = await notion.databases.query({
//     database_id: databaseId,
//   });
//   return response.results;
// };

export async function getDatabase(databaseId) {
  try {
    const response = await axios.post("http://localhost:3000/api/notion", {
      operation: "databaseQuery",
      data: { databaseId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching database from Notion API:", error);
    throw error;
  }
}
export async function getPage(pageId) {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response
}

export async function getBlocks(blockId) {
  blockId = blockId.replaceAll("-", "");
  console.log(blockId)

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

