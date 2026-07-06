"use client";

import { createContext, useContext, useState, useCallback } from "react";

type ViewMode = "humans" | "machines";

interface ViewModeContextValue {
  mode: ViewMode;
  toggle: () => void;
}

const ViewModeContext = createContext<ViewModeContextValue>({
  mode: "humans",
  toggle: () => {},
});

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ViewMode>("humans");
  const toggle = useCallback(
    () => setMode((m) => (m === "humans" ? "machines" : "humans")),
    []
  );

  return (
    <ViewModeContext.Provider value={{ mode, toggle }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  return useContext(ViewModeContext);
}
