import axios from "axios";

const BLOG_DATABASE_ID = process.env.BLOG_DATABASE_ID;
const SERVICES_DATABASE_ID = process.env.SERVICES_DATABASE_ID;
const PROJECTS_DATABASE_ID = process.env.PROJECTS_DATABASE_ID;

export const getBlogBySlug = async (slug) => {
  try {
    const response = await axios.post("/api/notion", {
      operation: "getBlogBySlug",
      data: { slug, databaseId: BLOG_DATABASE_ID },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    throw error;
  }
};

export const getServiceBySlug = async (slug) => {
  try {
    const response = await axios.post("/api/notion", {
      operation: "getServiceBySlug",
      data: { slug, databaseId: SERVICES_DATABASE_ID },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching service by slug:", error);
    throw error;
  }
};

export const getProjectBySlug = async (slug) => {
  try {
    const response = await axios.post("/api/notion", {
      operation: "getProjectBySlug",
      data: { slug, databaseId: PROJECTS_DATABASE_ID },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    throw error;
  }
};
