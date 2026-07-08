"use client";

import Link from "next/link";
import Image from "next/image";
import { useNavigatingLink } from "@/hooks/useNavigatingLink";

function ProjectCardContent({
  id,
  headline,
  description,
  coverImage,
  isPending,
}: {
  id: string;
  headline: string;
  description: string;
  coverImage?: string;
  isPending: boolean;
}) {
  return (
    <div
      id={id}
      className={`group relative flex w-full max-w-[300px] shrink-0 flex-col ${
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
  ...props
}: {
  id: string;
  slug: string;
  headline: string;
  description: string;
  coverImage?: string;
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
      className="block w-full max-w-[300px] cursor-pointer no-underline"
    >
      <ProjectCardContent {...props} isPending={isPending} />
    </Link>
  );
}

export default function ProjectCard({
  id,
  slug,
  headline,
  description,
  coverImage,
}: {
  id: string;
  slug?: string;
  headline: string;
  description: string;
  coverImage?: string;
}) {
  if (!slug) {
    return (
      <ProjectCardContent
        id={id}
        headline={headline}
        description={description}
        coverImage={coverImage}
        isPending={false}
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
    />
  );
}
