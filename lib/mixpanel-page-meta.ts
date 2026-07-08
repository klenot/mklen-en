export type BlogPostPageMeta = {
  content_type: "blog_post";
  slug: string;
  title: string;
  category: string;
};

type PageMeta = BlogPostPageMeta | Record<string, never>;

let pageMeta: PageMeta = {};

export function setBlogPostPageMeta(meta: Omit<BlogPostPageMeta, "content_type">) {
  pageMeta = { ...meta, content_type: "blog_post" };
}

export function clearPageMeta() {
  pageMeta = {};
}

export function getPageMeta(): PageMeta {
  return pageMeta;
}

export function isBlogPostPath(pathname: string) {
  return pathname.startsWith("/blog/") && pathname !== "/blog";
}
