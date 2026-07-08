import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN =
  process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? "20e4603d70c6d08c2766506bf249fae1";

let initialized = false;

export function initMixpanel(): boolean {
  if (initialized || typeof window === "undefined" || !MIXPANEL_TOKEN) {
    return initialized;
  }

  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === "development",
    track_pageview: false,
    persistence: "localStorage",
  });

  mixpanel.register({ platform: "web" });
  initialized = true;
  return true;
}

export function trackPageView(path: string, search: string) {
  if (!initMixpanel()) return;

  const page = search ? `${path}?${search}` : path;
  mixpanel.track("page_viewed", {
    page,
    path,
    search,
    url: window.location.href,
  });
}

export function trackEvent(
  name: string,
  properties?: Record<string, string | number | boolean | null | undefined>,
) {
  if (!initMixpanel()) return;
  mixpanel.track(name, properties);
}
