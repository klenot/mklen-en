const URL = "https://www.mklenotic.com";

export default async function sitemap() {
  const routes = [""].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }));

  return routes;
}