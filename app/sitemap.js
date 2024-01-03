// app/sitemap.js

import { getDatabase } from "app/libs/notion-server-side-fetching.jsx";

const URL = "https://www.mklenotic.com";

export default async function sitemap() {
  const postsData = await getDatabase(
    process.env.BLOG_DATABASE_ID,
    "Publish",
    "Published",
    "Publish",
    "Published"
  );
  const servicesData = await getDatabase(
    process.env.SERVICES_DATABASE_ID,
    "Publish",
    "Published",
    "Publish",
    "Published"
  );
  
  const projectsData = await getDatabase(
    process.env.PROJECTS_DATABASE_ID,
    "Publish",
    "Published",
    "Publish",
    "Published"
  );
  
  const posts = postsData.results.map((post) => ({
    url: `${URL}/blog/${post.properties.Slug.formula.string}`,
    lastModified: `${new Date(
      post.properties.LastEditedTime === null ? Date() : post.properties.LastEditedTime.last_edited_time
    ).toISOString()}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const services = servicesData.results.map((service) => ({
    url: `${URL}/services/${service.properties.Slug.formula.string}`,
    lastModified: `${new Date(
      service.properties.LastEditedTime === null ? Date() : service.properties.LastEditedTime.last_edited_time
    ).toISOString()}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const projects = projectsData.results.map((project) => ({
    url: `${URL}/projects/${project.properties.Slug.formula.string}`,
    lastModified: `${new Date(
      project.properties.LastEditedTime === null ? Date() : project.properties.LastEditedTime.last_edited_time
    ).toISOString()}`,
    changeFrequency: 'yearly',
    priority: 0.5,
  }));

  const routes = ["", "/services", "/about", "/about/cv", "/blog", "/projects", "/cooperation"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 1,
  }));

  return [...routes, ...posts, ...services, ...projects];
}