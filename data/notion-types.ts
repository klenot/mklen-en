export type RichText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  code?: boolean;
  link?: string;
};

export type NotionBlock =
  | { type: "heading_1"; text: RichText[] }
  | { type: "heading_2"; text: RichText[] }
  | { type: "heading_3"; text: RichText[] }
  | { type: "paragraph"; text: RichText[] }
  | { type: "bulleted_list_item"; text: RichText[]; children?: NotionBlock[] }
  | { type: "numbered_list_item"; text: RichText[]; children?: NotionBlock[] }
  | { type: "to_do"; text: RichText[]; checked: boolean }
  | { type: "toggle"; text: RichText[]; children: NotionBlock[] }
  | { type: "quote"; text: RichText[] }
  | { type: "callout"; text: RichText[]; icon: string }
  | { type: "divider" }
  | { type: "code"; text: string; language: string; caption?: string }
  | { type: "image"; url: string; caption?: string }
  | { type: "bookmark"; url: string; caption?: string }
  | { type: "table"; rows: string[][] }
  | { type: "equation"; expression: string };

export type BlogPost = {
  slug: string;
  icon: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readingTime: string;
  cover?: string;
  blocks: NotionBlock[];
};
