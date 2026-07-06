import Link from "next/link";
import Image from "next/image";

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
  const content = (
    <div id={id} className="group flex flex-col shrink-0 w-full max-w-[300px]">
      <div className="border border-black/0 aspect-4/5 rounded-4xl w-full transition-transform duration-300 ease-out group-hover:scale-95 overflow-hidden relative">
        {coverImage && (
          <Image
            src={coverImage}
            alt={headline}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
          />
        )}
      </div>
      <div className="flex flex-col pt-4 px-4 min-w-0 wrap-break-words">
        <h3 className="text-xl font-mono text-black transition-[font-weight] duration-300 ease-out font-medium group-hover:font-bold">
          {headline}
        </h3>
        <p className="text-sm font-mono text-black">{description}</p>
      </div>
    </div>
  );

  if (slug) {
    return (
      <Link href={`/blog/${slug}`} className="no-underline">
        {content}
      </Link>
    );
  }

  return content;
}
