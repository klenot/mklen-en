import ProjectCard from "@/components/elements/ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="flex justify-center py-16 shrink-0">
      <div className="flex flex-col items-center w-full max-w-[1200px] px-4">
        {/* this wrapper hugs the cards; heading + grid both align to its left edge */}
        <div className="inline-flex flex-col gap-4">
          <h2 className="text-2xl font-mono font-bold text-black">Projects</h2>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border border-blue-500 pb-4">
            <ProjectCard
              id="project-1"
              headline="DATTOO"
              description="An app for tattoo artists to manage their clients and appointments."
            />
            <ProjectCard
              id="project-2"
              headline="Project 2"
              description="Description of project 2"
            />
            <ProjectCard
              id="project-3"
              headline="Project 3"
              description="Description of project 3"
            />

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
