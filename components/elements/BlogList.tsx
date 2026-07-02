"use client";

import { useState } from "react";
import PostItem from "@/components/elements/PostItem";

type Post = {
  icon: string;
  title: string;
  description: string;
  category: string;
  date: string;
};

const POSTS: Post[] = [
  {
    icon: "🐾",
    title: "404: Cat Not Found",
    description:
      "The moment I open my laptop he becomes a warm paperweight on the exact key I need. A field study in feline sabotage and the quiet art of doing absolutely nothing productive.",
    category: "Chaos",
    date: "Jun 28, 2026",
  },
  {
    icon: "🐈",
    title: "The Midnight Zoomies Manifesto",
    description:
      "At precisely 3am physics stops applying. Here is what quantum mechanics can teach us about a cat sprinting up a wall for no discernible reason whatsoever.",
    category: "Science",
    date: "Jun 21, 2026",
  },
  {
    icon: "😼",
    title: "My Cat Reviewed My Code",
    description:
      "She strolled across the keyboard, somehow closed three tickets and opened a merge conflict. Honestly a stronger showing than most of my interns this quarter.",
    category: "Dev",
    date: "Jun 14, 2026",
  },
  {
    icon: "🐱",
    title: "A Box Is Worth a Thousand Beds",
    description:
      "I spent a small fortune on a plush designer cat bed. He sleeps exclusively in the cardboard box it shipped in. A tender meditation on minimalism and betrayal.",
    category: "Lifestyle",
    date: "Jun 07, 2026",
  },
  {
    icon: "🙀",
    title: "The Great Cucumber Incident",
    description:
      "No cucumbers were harmed, but my ego and the living room lamp did not survive the encounter. Hard lessons in trust, snacks, and deeply startled vertical leaps.",
    category: "Drama",
    date: "May 30, 2026",
  },
  {
    icon: "😻",
    title: "Purr-formance Optimization",
    description:
      "How I cut his response time to the treat bag from four seconds to two hundred milliseconds. Spoiler: the trick is sound design, not love, and definitely not respect.",
    category: "Tuning",
    date: "May 23, 2026",
  },
];

// how far each tile rises based on its distance from the hovered one, so the
// row behaves like a pressure-sensitive floor — the neighbours lift, but less
const LIFT_BY_DISTANCE = [12, 6, 2];

// matching hard shadow: the hovered tile is solid black, neighbours a lighter,
// smaller cast so the raised effect reads on them too
const SHADOW_BY_DISTANCE = [
  "4px 4px 0 0 #000",
  "2px 2px 0 0 rgba(0,0,0,0.75)",
];

// each tile further from the hover starts a beat later, so the lift travels
// outward and settles back like a ripple instead of everything moving at once
const DELAY_PER_DISTANCE = 70;

export default function BlogList() {
  const [hovered, setHovered] = useState<number | null>(null);

  const posts = POSTS.slice(0, 6);

  return (
    <ul className="flex flex-col gap-1">
      {posts.map((post, i) => {
        const distance = hovered === null ? Infinity : Math.abs(i - hovered);
        const lift = LIFT_BY_DISTANCE[distance] ?? 0;
        const shadow = SHADOW_BY_DISTANCE[distance] ?? "none";
        const delay =
          distance === Infinity ? 0 : distance * DELAY_PER_DISTANCE;

        return (
          <PostItem
            key={post.title}
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
