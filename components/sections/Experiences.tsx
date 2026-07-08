"use client";

import Image from "next/image";
import { trackEvent } from "@/lib/mixpanel";

const EXPERIENCE_LOGOS = [
  { src: "/logos/bandits.png", alt: "Bandits", href: "https://banditshq.com/cs" },
  {
    src: "/logos/product-lasso.webp",
    alt: "Lasso",
    href: "https://productlasso.com/",
  },
  { src: "/logos/apadore.webp", alt: "Apadore", href: "https://www.apadore.cz/" },
  {
    src: "/logos/wonder-makers.jpg",
    alt: "Wonder Makers",
    href: "https://www.wondermakers.digital/",
  },
  { src: "/logos/pria.webp", alt: "Pria", href: "https://pria.cz/" },
];

export default function Experiences() {
  return (
    <section id="experiences" className="mx-4 mt-4">
      <div className="relative flex min-h-[60vh] items-center justify-center overflow-hidden rounded-4xl border border-blue-900/40 bg-black/20 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/20 to-transparent" />

        <div className="relative flex flex-col items-center gap-10 px-6 py-24 text-center">
          <p className="font-mono text-lg text-white md:text-2xl">
            Got experience, got the <span className="font-regular">juice</span>.
          </p>

          <div className="flex h-16 items-center md:h-20">
            {EXPERIENCE_LOGOS.map((logo, i) => (
              <a
                key={logo.href}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={logo.alt}
                onClick={() =>
                  trackEvent("experience_logo_clicked", {
                    company: logo.alt,
                    href: logo.href,
                  })
                }
                style={{ zIndex: EXPERIENCE_LOGOS.length - i }}
                className="-ml-4 relative size-14 overflow-hidden rounded-full bg-black ring-2 ring-white transition-[width,height] duration-200 hover:size-16 first:ml-0 md:size-16 md:hover:size-18"
              >
                <Image
                  src={logo.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
