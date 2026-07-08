"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/mixpanel";
import {
  getPageMeta,
  isBlogPostPath,
  type BlogPostPageMeta,
} from "@/lib/mixpanel-page-meta";

const SCROLL_MILESTONES = [25, 50, 75, 90, 100] as const;

function blogPostProps(
  pathname: string,
  meta: BlogPostPageMeta | Record<string, never>,
) {
  return {
    slug: "slug" in meta ? meta.slug : pathname.split("/").pop() ?? "",
    title: "title" in meta ? meta.title : undefined,
    category: "category" in meta ? meta.category : undefined,
  };
}

export function usePageEngagement(pathname: string) {
  const firedRef = useRef(new Set<number>());
  const maxDepthRef = useRef(0);
  const startRef = useRef(Date.now());
  const sentRef = useRef(false);
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    pathnameRef.current = pathname;
    firedRef.current.clear();
    maxDepthRef.current = 0;
    startRef.current = Date.now();
    sentRef.current = false;

    const isBlogPost = isBlogPostPath(pathname);

    const completeEngagement = () => {
      if (sentRef.current) return;
      sentRef.current = true;

      const durationSeconds = Math.round((Date.now() - startRef.current) / 1000);
      const meta = getPageMeta();
      const post = blogPostProps(pathnameRef.current, meta);

      if (isBlogPostPath(pathnameRef.current)) {
        trackEvent("blog_post_engagement_completed", {
          path: pathnameRef.current,
          duration_seconds: durationSeconds,
          max_scroll_depth_percent: maxDepthRef.current,
          ...post,
        });
        return;
      }

      trackEvent("page_engagement_completed", {
        path: pathnameRef.current,
        duration_seconds: durationSeconds,
        max_scroll_depth_percent: maxDepthRef.current,
      });
    };

    const measureScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const depthPercent =
        scrollHeight <= 0
          ? 100
          : Math.min(
              100,
              Math.round((window.scrollY / scrollHeight) * 100),
            );

      maxDepthRef.current = Math.max(maxDepthRef.current, depthPercent);
      const meta = getPageMeta();
      const post = blogPostProps(pathname, meta);

      for (const milestone of SCROLL_MILESTONES) {
        if (depthPercent < milestone || firedRef.current.has(milestone)) {
          continue;
        }

        firedRef.current.add(milestone);

        if (isBlogPost) {
          trackEvent("blog_post_scroll_depth", {
            path: pathname,
            depth_percent: milestone,
            ...post,
          });
        } else {
          trackEvent("scroll_depth_reached", {
            path: pathname,
            depth_percent: milestone,
          });
        }
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        measureScroll();
      });
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        completeEngagement();
      }
    };

    measureScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", completeEngagement);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", completeEngagement);
      completeEngagement();
    };
  }, [pathname]);
}
