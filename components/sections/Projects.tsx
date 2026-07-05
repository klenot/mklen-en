import ProjectCard from "@/components/elements/ProjectCard";
import { getPostsByTag } from "@/data/posts";

export default function Projects() {
  const projects = getPostsByTag("project");

  return (
    <section id="projects" className="flex w-full justify-center pt-24 pb-16 shrink-0">
      <div className="flex flex-col items-center w-full max-w-[1200px] px-4">
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-4xl font-mono font-bold text-black mb-4">Projects</h2>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border border-blue-500 pb-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                id={project.slug}
                slug={project.slug}
                headline={project.title}
                description={project.description}
              />
            ))}

            <span className="absolute top-[-5px] left-[-5px] size-2 bg-blue-500" />
            <span className="absolute top-[-5px] right-[-5px] size-2 bg-blue-500" />
            <span className="absolute bottom-[-5px] left-[-5px] size-2 bg-blue-500" />
            <span className="absolute bottom-[-5px] right-[-5px] size-2 bg-blue-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
