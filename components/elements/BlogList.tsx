"use client";

import { useState } from "react";
import PostItem from "@/components/elements/PostItem";
import type { Post } from "@/data/types";

// how far each tile rises based on its distance from the hovered one, so the
// row behaves like a pressure-sensitive floor — the neighbours lift, but less
const LIFT_BY_DISTANCE = [12, 6, 2];

// matching hard shadow: the hovered tile is solid black, neighbours a lighter,
// smaller cast so the raised effect reads on them too
const SHADOW_BY_DISTANCE = ["4px 4px 0 0 #000", "2px 2px 0 0 rgba(0,0,0,0.75)"];

// each tile further from the hover starts a beat later, so the lift travels
// outward and settles back like a ripple instead of everything moving at once
const DELAY_PER_DISTANCE = 70;

export default function BlogList({ posts }: { posts: Post[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <ul className="flex w-full flex-col gap-1">
      {posts.map((post, i) => {
        const distance = hovered === null ? Infinity : Math.abs(i - hovered);
        const lift = LIFT_BY_DISTANCE[distance] ?? 0;
        const shadow = SHADOW_BY_DISTANCE[distance] ?? "none";
        const delay = distance === Infinity ? 0 : distance * DELAY_PER_DISTANCE;

        return (
          <PostItem
            key={post.slug}
            {...post}
            lift={lift}
            shadow={shadow}
            delay={delay}
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
          />
        );
      })}
    </ul>
  );
}
