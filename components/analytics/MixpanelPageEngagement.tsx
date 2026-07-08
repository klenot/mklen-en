"use client";

import { usePathname } from "next/navigation";
import { usePageEngagement } from "@/hooks/usePageEngagement";
import { useSectionViews } from "@/hooks/useSectionViews";

export default function MixpanelPageEngagement() {
  const pathname = usePathname();

  usePageEngagement(pathname);
  useSectionViews(pathname);

  return null;
}
