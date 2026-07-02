"use client";

import { Component, type ReactNode } from "react";

/**
 * Isolates the game from the rest of the site. If anything in the game subtree
 * throws during render, this swallows it and shows a tiny fallback instead of
 * crashing the page. Runtime errors inside the rAF loop are caught separately
 * inside the game itself (async errors don't bubble to error boundaries).
 */
export default class GameErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.error("SpaceImpact crashed:", error);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex h-full w-full items-center justify-center font-mono text-xs text-black/40">
            the game took a coffee break ☕
          </div>
        )
      );
    }
    return this.props.children;
  }
}
