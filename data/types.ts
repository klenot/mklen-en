export type Post = {
  slug: string;
  icon: string;
  title: string;
  description: string;
  content: string;
  category: string;
  date: string;
  tag: "blog" | "project";
  coverImage?: string;
};
