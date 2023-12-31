import Link from "next/link";
import ProjectRepeater from "app/components/Projects/project-repeater.jsx";

export default function ProjectSection({
  title,
  description,
  button,
  filters,
}) {
  return (
    <>
      <section id='project-section'>
        <div className='landing-page-container'>
          {title === "" ? (
            null
          ) : (
            <div className='landing-page-section pb-1'>
              <h2>{title}</h2>
            </div>
          )}
          {description === "" ? (
            null
          ) : (
            <div className='landing-page-section'>
              <p>{description}</p>
              <br />
            </div>
          )}
        </div>
        <div className='landing-page-container'>
          <ProjectRepeater
            filterA={filters.filterA}
            categoryA={filters.categoryA}
            filterB={filters.filterB}
            categoryB={filters.categoryB}
          />
        </div>

        {button.text === "" ? (
          null
        ) : (
          <div className='landing-page-container'>
            <div className='landing-page-section button-wrapper'>
              <button className='cta ctaLarge'>
                {button.link === "" ? (
                  <Link href='/'>
                    <span>{button.text}</span>
                  </Link>
                ) : (
                  <Link href={button.link}>
                    <span>{button.text}</span>
                  </Link>
                )}
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
