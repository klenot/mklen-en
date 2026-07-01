export default function ProjectCard({
  id,
  headline,
  description,
}: {
  id: string;
  headline: string;
  description: string;
}) {
  return (
    <>
      <div id={id} className="flex flex-col shrink-0 w-full max-w-[300px]">
        <div className="border border-black aspect-4/5 rounded-4xl w-full" />
        <div className="flex flex-col pt-4 px-4 min-w-0 wrap-break-words">
          <h3 className="text-lg font-bold font-mono text-black">{headline}</h3>
          <p className="text-sm font-mono text-black">{description}</p>
        </div>
      </div>
    </>
  );
}
