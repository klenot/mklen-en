"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Review = {
  name: string;
  role: string;
  text: string;
  photo?: string;
};

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
    text: "I appreciate Marek's enthusiasm and business-oriented way of thinking. Combined with his ability to understand how things work technically and to communicate and translate information to and from the company, I consider Marek a very valuable member of the Easy Software marketing team.",
  },
  {
    name: "Martin Štěpaník",
    role: "ex-CEO Targito",
    text: "Marek has extensive knowledge in the field of digital marketing. At Targito, he significantly contributed to finalizing and launching the company's new website. We look forward to further collaboration with Marek in the areas of digital marketing!",
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
    text: "We were able to make a great progress in the early stages of our marketing efforts thanks to Marek's wide expertise.",
  },
];

const COLUMN_X = [15, 38, 62, 85];
const COLUMNS = COLUMN_X.length;

function ReviewCard({
  review,
  index,
  progress,
  viewportH,
  isDesktop,
}: {
  review: Review;
  index: number;
  progress: MotionValue<number>;
  viewportH: number;
  isDesktop: boolean;
}) {
  const col = index % COLUMNS;
  const isEven = index % 2 === 0;

  const stagger = 0.085;
  const start = Math.min(index * stagger, 0.5);
  const end = Math.min(start + 0.55, 1);
  const mid = (start + end) / 2;

  const y = useTransform(
    progress,
    [start, end],
    [viewportH * 1.15, -viewportH * 1.25],
  );
  const opacity = useTransform(
    progress,
    [start, start + 0.05, end - 0.1, end],
    [0, 1, 1, 0],
  );
  const rotateX = useTransform(progress, [start, end], isDesktop ? [14, -10] : [0, 0]);
  const rotateZ = useTransform(
    progress,
    [start, mid, end],
    isDesktop ? [0, 0, 0] : isEven ? [-3, 0, 2] : [3, 0, -2],
  );
  const z = useTransform(
    progress,
    [start, mid, end],
    isDesktop ? [-140, 60, -100] : [0, 0, 0],
  );
  const scale = useTransform(
    progress,
    [start, mid, end],
    isDesktop ? [0.84, 1, 0.9] : [0.92, 1, 0.95],
  );

  const xOffset = isDesktop ? "-50%" : isEven ? "calc(-50% - 18px)" : "calc(-50% + 18px)";

  return (
    <motion.div
      style={{
        left: isDesktop ? `${COLUMN_X[col]}%` : "50%",
        x: xOffset,
        y,
        z,
        rotateX,
        rotateZ,
        scale,
        opacity,
      }}
      className="absolute top-0 w-[min(320px,calc(100vw-32px))] origin-bottom rounded-2xl border border-white/10 bg-black p-3 text-white shadow-[0_12px_40px_-8px_rgba(0,100,200,0.35),0_30px_60px_-20px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.18)] md:w-[340px] md:p-4"
    >
      <div className="flex items-center gap-2.5">
        <div className="relative size-8 shrink-0 overflow-hidden rounded-full bg-white/15 ring-1 ring-white/25 md:size-9">
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
        <div className="min-w-0">
          <p className="truncate font-mono text-[0.9375rem] font-bold leading-tight text-white md:text-base">
            {review.name}
          </p>
          <p className="truncate font-mono text-xs font-light text-white/70 md:text-[0.8125rem]">
            {review.role}
          </p>
        </div>
      </div>
      <p className="mt-2 line-clamp-4 text-[0.8125rem] leading-relaxed text-white/90 md:line-clamp-5 md:text-[0.9375rem] md:leading-relaxed lg:text-base">
        {review.text}
      </p>
    </motion.div>
  );
}

export default function Reviews() {
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [viewportH, setViewportH] = useState(0);
  useEffect(() => {
    const update = () => setViewportH(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section ref={ref} id="reviews" className="relative h-[320vh]">
      <div
        className="sticky top-0 h-dvh overflow-hidden"
        style={
          isDesktop
            ? { perspective: "1200px", transformStyle: "preserve-3d" }
            : undefined
        }
      >
        {viewportH > 0 &&
          REVIEWS.map((review, i) => (
            <ReviewCard
              key={review.name}
              review={review}
              index={i}
              progress={scrollYProgress}
              viewportH={viewportH}
              isDesktop={isDesktop}
            />
          ))}
      </div>
    </section>
  );
}
