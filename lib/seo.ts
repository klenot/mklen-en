import type { Metadata } from "next";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/lib/site";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: absoluteUrl("/"),
    types: {
      "text/markdown": absoluteUrl("/index.html.md"),
    },
  },
};

const draftPreviewRobots: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};

export function draftBlogPostMetadata(post: {
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
}): Metadata {
  const title = post.metaTitle ?? post.title;
  const description = post.metaDescription ?? post.description;

  return {
    title: `[Draft] ${title}`,
    description,
    robots: draftPreviewRobots,
  };
}

export function blogPostMetadata(post: {
  slug: string;
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  coverImage?: string;
  date: string;
}): Metadata {
  const title = post.metaTitle ?? post.title;
  const description = post.metaDescription ?? post.description;
  const url = absoluteUrl(`/blog/${post.slug}`);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      types: {
        "text/markdown": absoluteUrl(`/blog/${post.slug}.md`),
      },
    },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: post.date,
      ...(post.coverImage ? { images: [{ url: post.coverImage, alt: post.title }] } : {}),
    },
    twitter: {
      card: post.coverImage ? "summary_large_image" : "summary",
      title,
      description,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
  };
}

export function blogPostingJsonLd(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
  coverImage?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: absoluteUrl(`/blog/${post.slug}`),
    author: {
      "@type": "Person",
      name: "Marek Klenotič",
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Person",
      name: "Marek Klenotič",
      url: absoluteUrl("/"),
    },
    ...(post.coverImage ? { image: post.coverImage } : {}),
  };
}
