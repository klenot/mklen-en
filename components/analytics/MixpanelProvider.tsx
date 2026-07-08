"use client";

import { Suspense, useEffect, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initMixpanel, trackPageView } from "@/lib/mixpanel";
import MixpanelPageEngagement from "@/components/analytics/MixpanelPageEngagement";

function MixpanelPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    initMixpanel();
  }, []);

  useEffect(() => {
    trackPageView(pathname, searchParams.toString());
  }, [pathname, searchParams]);

  return null;
}

export default function MixpanelProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <MixpanelPageView />
      </Suspense>
      <MixpanelPageEngagement />
      {children}
    </>
  );
}
