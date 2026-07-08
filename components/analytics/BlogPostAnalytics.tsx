"use client";

import { useLayoutEffect } from "react";
import {
  clearPageMeta,
  setBlogPostPageMeta,
} from "@/lib/mixpanel-page-meta";

export default function BlogPostAnalytics({
  slug,
  title,
  category,
}: {
  slug: string;
  title: string;
  category: string;
}) {
  useLayoutEffect(() => {
    setBlogPostPageMeta({ slug, title, category });
    return () => clearPageMeta();
  }, [slug, title, category]);

  return null;
}
