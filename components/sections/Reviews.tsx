"use client";

import Image from "next/image";
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
  photo?: string;
};

// Varying text lengths on purpose: the card grows with its content, so the
// staggered heights read as a loose grid rather than a tidy row.
const REVIEWS: Review[] = [
  {
    name: "Lukáš Hubka",
    role: "Art Director",
    photo: "/reviews/lukas.jpg",
    text: "Marek is able to combine his technical skills with his experience in digital marketing, which greatly benefits the development of websites and applications. As a designer, I most value his ability to understand what needs to be done for successful implementation — before the implementation even begins.",
  },
  {
    name: "Filip Vašulín",
    role: "Co-Founder at Wonder Makers",
    photo: "/reviews/filip.jpg",
    text: "Marek possesses a broad range of knowledge across the entire spectrum of marketing. This multidisciplinary overlap is an advantage for any company. At the same time, Marek has experience in project management, which further highlights his ability to execute set decisions.",
  },
  {
    name: "Miroslav Pecka",
    role: "Web & Analytics Consultant",
    text: "I appreciate Marek’s enthusiasm and business-oriented way of thinking. Combined with his ability to understand how things work technically and to communicate and translate information to and from the company, I consider Marek a very valuable member of the Easy Software marketing team.",
  },
  {
    name: "Martin Štěpaník",
    role: "ex-CEO Targito",
    text: "Marek has extensive knowledge in the field of digital marketing. At Targito, he significantly contributed to finalizing and launching the company’s new website. We look forward to further collaboration with Marek in the areas of digital marketing!",
  },
  {
    name: "Michaela Zedníková",
    role: "Organization Designer & Culture Shaper",
    text: "I met Marek during the project of analysing and implementing new processes in digital marketing agency In creative. Even though the project was not completed entirely Marek showed good process thinking abilities and potential in process design. The cooperation with Marek was an inspiring part of the project.",
  },
  {
    name: "Vít Mačuda",
    role: "Co-founder RunningFox, PPC Expert",
    text: "Marek is a hard worker with a sincere heart. Cooperation with him is very rewarding after finding common tune. He is inspiring with his dedication to the job related topics, his ideas and organizational skills. I am looking forward to continue working with Marek in my future projects.",
  },
  {
    name: "Mikoláš Voborský",
    role: "Founder at Apadore",
    photo: "/reviews/mikolas.jpg",
    text: "We were able to make a great progress in the early stages of our marketing efforts thanks to Marek’s wide expertise.",
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
      <div className="relative size-9 overflow-hidden rounded-full bg-white/15 ring-1 ring-white/25">
        {review.photo ? (
          <Image
            src={review.photo}
            alt={review.name}
            fill
            className="object-cover"
            sizes="36px"
          />
        ) : null}
      </div>
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
