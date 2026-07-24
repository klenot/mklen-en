import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import BlogPostSkeleton from "@/components/blog/BlogPostSkeleton";
import { draftPreviewLoadingMetadata } from "@/lib/seo";
import { isValidDraftPreviewToken } from "@/lib/draft-preview";
import DraftBlogPreviewContent from "./DraftBlogPreviewContent";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const maxDuration = 60;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { token } = await searchParams;

  if (!isValidDraftPreviewToken(token)) return {};

  return draftPreviewLoadingMetadata(slug);
}

export default async function DraftBlogPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { slug } = await params;
  const { token } = await searchParams;

  if (!isValidDraftPreviewToken(token)) notFound();

  return (
    <main className="flex min-h-dvh flex-col items-center bg-white px-4 pb-24 pt-16">
      <Suspense fallback={<BlogPostSkeleton />}>
        <DraftBlogPreviewContent slug={slug} />
      </Suspense>
    </main>
  );
}
