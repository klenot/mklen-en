"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

type Review = {
  name: string;
  role: string;
  text: string;
};

// Varying text lengths on purpose: the card grows with its content, so the
// staggered heights read as a loose grid rather than a tidy row.
const REVIEWS: Review[] = [
  {
    name: "Jana Nováková",
    role: "Product Lead",
    text: "Shipped fast and kept everyone in the loop the whole way.",
  },
  {
    name: "Tomáš Dvořák",
    role: "CTO, Fintech",
    text: "Rare mix of ops instinct and clean code. He untangled our deploy pipeline in a week and it has been quiet ever since.",
  },
  {
    name: "Lena Ford",
    role: "Designer",
    text: "Just gets it.",
  },
  {
    name: "Petr Malý",
    role: "Founder",
    text: "Treated our budget like his own and the results showed. Would hire again without a second thought.",
  },
  {
    name: "Aisha Khan",
    role: "Eng Manager",
    text: "Calm under pressure, sharp with tradeoffs.",
  },
  {
    name: "Marco Rossi",
    role: "Head of Growth",
    text: "Turned a vague idea into a working product. Honest about risks and genuinely pleasant to work with across three quarters.",
  },
  {
    name: "Sara Beck",
    role: "PM",
    text: "Reliable, quick, and low drama.",
  },
];

// Up to 4 columns across the stage. Each column is a horizontal anchor (% of
// stage width); cards are centered on it. Reduce this to 3 if it feels crowded.
const COLUMN_X = [15, 38, 62, 85];
const COLUMNS = COLUMN_X.length;

function ReviewCard({
  review,
  index,
  progress,
  viewportH,
}: {
  review: Review;
  index: number;
  progress: MotionValue<number>;
  viewportH: number;
}) {
  const col = index % COLUMNS;

  // Each card owns a slice of the scroll so they cross the frame at different
  // times — "mostly not on the same line".
  const stagger = 0.085;
  const start = Math.min(index * stagger, 0.5);
  const end = Math.min(start + 0.55, 1);
  const mid = (start + end) / 2;

  // Float from below the bottom edge up past the top, where it slips under the
  // glass ceiling. Transform translate can't take vh, so we drive it in px.
  const y = useTransform(
    progress,
    [start, end],
    [viewportH * 1.15, -viewportH * 1.25]
  );
  const opacity = useTransform(
    progress,
    [start, start + 0.05, end - 0.1, end],
    [0, 1, 1, 0]
  );
  // 3D: tilts toward you low, levels out, plus a gentle depth swell.
  const rotateX = useTransform(progress, [start, end], [14, -10]);
  const z = useTransform(progress, [start, mid, end], [-140, 60, -100]);
  const scale = useTransform(progress, [start, mid, end], [0.84, 1, 0.9]);

  return (
    <motion.div
      style={{
        left: `${COLUMN_X[col]}%`,
        x: "-50%",
        y,
        z,
        rotateX,
        scale,
        opacity,
      }}
      className="absolute top-0 w-[150px] origin-bottom rounded-2xl border border-white/10 bg-black p-4 text-white shadow-[0_12px_40px_-8px_rgba(0,100,200,0.35),0_30px_60px_-20px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.18)]"
    >
      <div className="size-9 rounded-full bg-white/15 ring-1 ring-white/25" />
      <p className="mt-3 font-mono text-sm font-bold leading-tight text-white">
        {review.name}
      </p>
      <p className="font-mono text-xs font-light text-white/70">
        {review.role}
      </p>
      <p className="mt-2 text-sm leading-snug text-white/90">{review.text}</p>
    </motion.div>
  );
}

export default function Reviews() {
  const ref = useRef<HTMLElement>(null);

  // progress 0 → stage pins at the top, 1 → stage about to release
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Transform translate needs px, so we mirror the viewport height in.
  const [viewportH, setViewportH] = useState(0);
  useEffect(() => {
    const update = () => setViewportH(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section ref={ref} id="reviews" className="relative h-[320vh]">
      {/* Pinned stage: freezes in the middle while cards float by. Perspective
          + preserve-3d give the cards real depth as they rise. */}
      <div
        className="sticky top-0 h-dvh overflow-hidden"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        {viewportH > 0 &&
          REVIEWS.map((review, i) => (
            <ReviewCard
              key={review.name}
              review={review}
              index={i}
              progress={scrollYProgress}
              viewportH={viewportH}
            />
          ))}
      </div>
    </section>
  );
}
