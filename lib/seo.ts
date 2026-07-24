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

type BlogPostSummaryFields = {
  description: string;
  metaDescription?: string;
};

export function blogPostSummary(post: BlogPostSummaryFields): string {
  return post.metaDescription ?? post.description;
}

export function draftBlogPostMetadata(post: {
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
}): Metadata {
  const title = post.metaTitle ?? post.title;
  const description = blogPostSummary(post);

  return {
    title: `[Draft] ${title}`,
    description,
    robots: draftPreviewRobots,
  };
}

export function draftPreviewLoadingMetadata(slug: string): Metadata {
  const title = slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return {
    title: title ? `[Draft] ${title}` : "[Draft] Preview",
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
  const description = blogPostSummary(post);
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
  metaDescription?: string;
  date: string;
  coverImage?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: blogPostSummary(post),
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
