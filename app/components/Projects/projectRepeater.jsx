import Link from "next/link";
import Image from "next/image";
import { getDatabaseWithAnd } from "app/libs/notionServices";

export default async function ProjectRepeater({
  filterA,
  categoryA,
  filterB,
  categoryB,
}) {
  /* const projects = await getProjects(); */
  const projects = await getDatabaseWithAnd(
      process.env.PROJECTS_DATABASE_ID,
      filterA,
      categoryA,
      filterB,
      categoryB
    );
  
  return (
    <>
      {/* <div className='tile-filter pt-2 pb-2'>
        <div>
          <button onClick={showAll} className='post-category-filter-button'>
            <span>All</span>
          </button>
        </div>

        <div>
          <button
            onClick={showProjectManagementPosts}
            className='post-category-pm-filter-button'>
            <span>Project management</span>
          </button>
        </div>

        <div>
          <button
            onClick={showProductivityPosts}
            className='post-category-prod-filter-button'>
            <span>Productivity</span>
          </button>
        </div>

        <div>
          <button
            onClick={showThoughtsPosts}
            className='post-category-thg-filter-button'>
            <span>Thoughts</span>
          </button>
        </div>
      </div> */}

      <div className='tile-container'>
        {projects.map((project) => (
          <Link
            className='tile-wrapper'
            key={project.id}
            href={`/projects/${project.properties.Slug.formula.string}`}>
            <div className='tile-card'>
              <div className='tile-image-wrapper'>
                <Image
                  src={"/images/blog/doge-computer.webp"}
                  width={300}
                  height={200}
                  alt={"Alt text."}
                />
              </div>

              <div className='tile-info-wrapper'>
                <div className='tile-info'>
                  <div>
                    <h3>{project.properties.ProjectName.title[0].plain_text}</h3>
                    <p className='pt-1 pb-1'>
                      {project.properties.Description.rich_text[0].plain_text}
                    </p>
                  </div>
                </div>

                <div className='tile-more-info'>
                  <div
                    className={
                      project.properties.AutoClassGenerator.formula.string
                    }>
                    <div className='pill'>
                      <span className='tile-category-text'>
                        {project.properties.Category.multi_select[0].name}
                      </span>
                    </div>
                  </div>

                  {/* <div className='tile-date'>
                    <div className='pill'>
                      <span className='tile-date-text'>
                        {new Date(
                          post.properties.PostDate.date.start
                        ).toLocaleString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );


}
