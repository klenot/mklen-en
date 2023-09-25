import getProjects from "app/libs/getProjects";
import Link from "next/link";

export default async function ProjectRepeater() {
  const projects = await getProjects();

  return (
    <>
      <div className='service-container'>
        <div className='cards-container'>
          <div className='cards'>
            {projects.map((project) => (
              <Link
              href={`/projects/${project.properties.Slug.formula.string}`}
              >
              <div key={project.id} className='card'>
                <div>
                  <h3>{project.properties.ProjectName.title[0].plain_text}</h3>
                  <p className='service-description'>
                    {project.properties.Description.rich_text[0].plain_text}
                  </p>
                </div>
                <div className='service-category'>
                  <div className='pill'>
                    <span className='service-category-text'>
                      {project.properties.Category.multi_select[0].name}
                    </span>
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
