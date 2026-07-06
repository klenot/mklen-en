import Link from "next/link";

const MAX_DESC = 150;

function trim(text: string, max: number = MAX_DESC) {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}

export default function PostItem({
  slug,
  icon,
  title,
  description,
  category,
  date,
  lift = 0,
  shadow = "none",
  delay = 0,
  onHoverStart,
  onHoverEnd,
}: {
  slug: string;
  icon: string;
  title: string;
  description: string;
  category: string;
  date: string;
  lift?: number;
  shadow?: string;
  delay?: number;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}) {
  return (
    <li
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      style={{
        transform: `translateY(-${lift}px)`,
        boxShadow: shadow,
        transitionDelay: `${delay}ms`,
      }}
      className="transition-[transform,box-shadow] duration-500 ease-out will-change-transform"
    >
      <Link
        href={`/blog/${slug}`}
        className="group flex items-start gap-4 bg-white pr-4 py-3"
      >
        <div className="flex min-w-0 flex-1 flex-col wrap-break-words">
          <h3 className="text-base font-mono text-black transition-[font-weight] duration-300 ease-out font-medium group-hover:font-bold">{title}</h3>
          <p className="text-sm font-light font-mono text-black/60">
            {trim(description)}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end justify-between self-stretch pl-2 text-right">
          <span className="rounded-full border border-black/15 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide text-black/70">
            {category}
          </span>
          <time className="text-[10px] font-light font-mono text-black/40">
            {date}
          </time>
        </div>
      </Link>
    </li>
  );
}
