import Link from "next/link";
import ProjectRepeater from "./projectRepeater";

export default function ProjectSection({ title, description, buttonText, buttonLink }) {
  return (
    <>
      <section id='project-section'>
        <div className='service-container'>
          {title === "-" ? (
            <></>
          ) : (
            <div className='service-section pb-1'>
              <h2>{title}</h2>
            </div>
          )}
          {description === "-" ? (
            <></>
          ) : (
            <div className='service-section'>
              <p>{description}</p>
              <br />
            </div>
          )}
        </div>

        <ProjectRepeater />

        {buttonText === "-" ? (
          <></>
        ) : (
          <div className='service-container'>
            <div className='hero-section hero-button-wrapper'>
              <button className='cta'>
                <Link href={`/${buttonLink}`}>
                  <span>{buttonText}</span>
                </Link>
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
