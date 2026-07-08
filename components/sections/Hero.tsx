"use client";

import { useEffect, useState } from "react";

const TEXTS = [
  "Hi, my name is Marek.",
  "I do digital.",
  "Currently, I work at a startup.",
  "I know some neat ops tricks I can share.",
  "Sometimes, I write code.",
  "Or, nowdays instruct agents.",
  "I’ll do my best to make your company better.",
  "I also like chess.",
  "If you wanna play.",
];

const TYPING_SPEED = 55;
const ERASING_SPEED = 30;
const HOLD_DURATION = 2500;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">(
    "typing",
  );

  useEffect(() => {
    const current = TEXTS[index];

    if (phase === "typing") {
      if (text === current) {
        const timer = setTimeout(() => setPhase("holding"), HOLD_DURATION);
        return () => clearTimeout(timer);
      }
      const timer = setTimeout(() => {
        setText(current.slice(0, text.length + 1));
      }, TYPING_SPEED);
      return () => clearTimeout(timer);
    }

    if (phase === "holding") {
      setPhase("erasing");
      return;
    }

    // erasing
    if (text === "") {
      setIndex((prev) => (prev + 1) % TEXTS.length);
      setPhase("typing");
      return;
    }
    const timer = setTimeout(() => {
      setText(current.slice(0, text.length - 1));
    }, ERASING_SPEED);
    return () => clearTimeout(timer);
  }, [text, phase, index]);

  return (
    <section
      id="hero"
      className="relative flex h-[65vh] overflow-hidden rounded-t-3xl"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/abstract-gradient-texture-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{
          background: "linear-gradient(to bottom, #0082FF, #110058)",
          maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        }}
      />
      <div className="flex items-center w-full justify-center relative">
        <h2 className="flex items-center font-mono text-white text-xl">
          {text}
          <span
            className="ml-1 inline-block h-8 w-[3px] animate-pulse rounded-full"
            style={{ backgroundColor: "#FF8008" }}
          />
        </h2>
      </div>
    </section>
  );
}
