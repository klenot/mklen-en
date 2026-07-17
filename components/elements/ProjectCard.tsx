"use client";

import Link from "next/link";
import Image from "next/image";
import { useNavigatingLink } from "@/hooks/useNavigatingLink";

function cardWidthClass(fullWidthMobile: boolean) {
  return fullWidthMobile
    ? "w-full max-w-none sm:max-w-[300px]"
    : "w-full max-w-[300px]";
}

function ProjectCardContent({
  id,
  headline,
  description,
  coverImage,
  isPending,
  fullWidthMobile,
}: {
  id: string;
  headline: string;
  description: string;
  coverImage?: string;
  isPending: boolean;
  fullWidthMobile: boolean;
}) {
  return (
    <div
      id={id}
      className={`group relative flex shrink-0 flex-col ${cardWidthClass(fullWidthMobile)} ${
        isPending ? "opacity-60" : ""
      }`}
    >
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-4xl border border-black/0 transition-transform duration-300 ease-out group-hover:scale-95">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={headline}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
          />
        ) : null}
        {isPending ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <span className="font-mono text-[11px] text-black/50">loading…</span>
          </div>
        ) : null}
      </div>
      <div className="flex min-w-0 flex-col wrap-break-words px-4 pt-4">
        <h3 className="mb-3 font-mono text-xl font-medium text-black transition-[font-weight] duration-300 ease-out group-hover:font-bold">
          {headline}
        </h3>
        <p className="font-mono text-sm text-black">{description}</p>
      </div>
    </div>
  );
}

function LinkedProjectCard({
  slug,
  fullWidthMobile,
  ...props
}: {
  id: string;
  slug: string;
  headline: string;
  description: string;
  coverImage?: string;
  fullWidthMobile: boolean;
}) {
  const href = `/blog/${slug}`;
  const { isPending, navigate, prefetch } = useNavigatingLink(href);

  return (
    <Link
      href={href}
      prefetch
      onMouseEnter={prefetch}
      onClick={navigate}
      aria-busy={isPending}
      className={`block cursor-pointer no-underline ${cardWidthClass(fullWidthMobile)}`}
    >
      <ProjectCardContent
        {...props}
        fullWidthMobile={fullWidthMobile}
        isPending={isPending}
      />
    </Link>
  );
}

export default function ProjectCard({
  id,
  slug,
  headline,
  description,
  coverImage,
  fullWidthMobile = false,
}: {
  id: string;
  slug?: string;
  headline: string;
  description: string;
  coverImage?: string;
  fullWidthMobile?: boolean;
}) {
  if (!slug) {
    return (
      <ProjectCardContent
        id={id}
        headline={headline}
        description={description}
        coverImage={coverImage}
        isPending={false}
        fullWidthMobile={fullWidthMobile}
      />
    );
  }

  return (
    <LinkedProjectCard
      id={id}
      slug={slug}
      headline={headline}
      description={description}
      coverImage={coverImage}
      fullWidthMobile={fullWidthMobile}
    />
  );
}
