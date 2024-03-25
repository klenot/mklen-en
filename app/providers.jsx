"use client"

import React, { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import TagManager from "react-gtm-module";
import { usePathname } from "next/navigation";

const Providers = ({ children }) => {
  const gtmId = process.env.GTM_ID;
  const pathname = usePathname();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      // Initialize Google Tag Manager only once
      TagManager.initialize({
        gtmId: gtmId,
      });
      /* console.log("Data layer:", window.dataLayer); */
      setInitialized(true);
    }
  }, [initialized, gtmId]);

  useEffect(() => {
    // Send pageview event only if GTM is initialized and pathname changes
    if (initialized && window.dataLayer) {
      TagManager.dataLayer({
        dataLayer: {
          event: "pageview",
          pagePath: pathname,
          pageTitle: document.title,
        },
      });
      /* console.log("Updated data layer:", window.dataLayer); */
    }
  }, [initialized, pathname]);

  return (
    <ThemeProvider attribute='class' themes={["dark", "light"]}>
      {children}
    </ThemeProvider>
  );
};

export default Providers;